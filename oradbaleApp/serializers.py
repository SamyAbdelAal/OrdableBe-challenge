from rest_framework import serializers
from .models import Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'options']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) 

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'customer_email', 'created_at', 'status', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.customer_email = validated_data.get('customer_email', instance.customer_email)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        if items_data is not None:
            for item_data in items_data:
                item_id = item_data.get('id')
                if item_id:
                    # Update existing item
                    item = OrderItem.objects.get(id=item_id, order=instance)
                    item.quantity = item_data.get('quantity', item.quantity)
                    item.price_at_purchase = item_data.get('price_at_purchase', item.price_at_purchase)
                    item.save()
                else:
                    # Create new item
                    OrderItem.objects.create(order=instance, **item_data)

        return instance
