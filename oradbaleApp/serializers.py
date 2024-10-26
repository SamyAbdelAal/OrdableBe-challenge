from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Order, OrderItem, Options, ProductOptions 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['is_admin'] = self.user.is_staff
        
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProductOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptions
        fields = ['id', 'value', 'extra_price']


class OptionsSerializer(serializers.ModelSerializer):
    product_options = ProductOptionsSerializer(many=True)

    class Meta:
        model = Options
        fields =  ['id', 'name', 'product_options']


class ProductSerializer(serializers.ModelSerializer):
    options = OptionsSerializer(many=True, )

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'options']
   

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])
        product = Product.objects.create(**validated_data)
        for option_data in options_data:
            product_options_data = option_data.pop('product_options', [])
            option_instance = Options.objects.create(product=product, **option_data)
            for product_option in product_options_data:
                ProductOptions.objects.create(options=option_instance, **product_option)

        return product


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())  


    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_purchase', 'selected_options']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) 
    total_order_value = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'customer_email', 'created_at', 'status', 'items','total_order_value']

    def get_total_order_value(self, obj):
        return obj.get_total_order_value()

    def create(self, validated_data):
        print(validated_data)
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item in items_data:
            quantity = item['quantity']
            selected_options = item.get('selected_options', {}) 
            price_at_purchase = item['price_at_purchase']
            print(selected_options)
            product = item['product']
            OrderItem.objects.create(order=order,product=product,selected_options=selected_options,quantity=quantity,price_at_purchase=price_at_purchase)
        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.customer_email = validated_data.get('customer_email', instance.customer_email)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        if items_data is not None:
            for item in items_data:
                item_id = item.get('id')
                if item_id:
                    item = OrderItem.objects.get(id=item_id, order=instance)
                    item.quantity = item.get('quantity', item.quantity)
                    item.price_at_purchase = item.get('price_at_purchase', item.price_at_purchase)
                    item.save()
                else:
                    OrderItem.objects.create(order=instance, **item)

        return instance
