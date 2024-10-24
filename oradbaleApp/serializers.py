from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Order, OrderItem, Options, ProductOptions 



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user



class ProductSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price','image', 'options']
    def get_options(self, obj):
        return OptionsSerializer(obj.options_set.all(), many=True).data
  
class ItemOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptions
        fields = (
            'id',
            'value',
            'extra_price'
        )


class OptionsSerializer(serializers.ModelSerializer):
    product_options = serializers.SerializerMethodField()

    class Meta:
        model = Options
        fields = (
            'id',
            'name',
            'product_options'
        )

    def get_product_options(self, obj):
        return ItemOptionsSerializer(obj.productoptions_set.all(), many=True).data


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())  


    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_purchase', 'selected_options']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) 

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'customer_email', 'created_at', 'status', 'items',]

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
