from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', null=True, blank=True) 

    def __str__(self):
        return self.name
  
class Options(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)  # size

    def __str__(self):
        return self.name


class ProductOptions(models.Model):
    options = models.ForeignKey(Options, on_delete=models.CASCADE)
    value = models.CharField(max_length=50)  
    extra_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    def __str__(self):
        return self.value


class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
        ('accepted', 'Accepted'),
        ('cancelled', 'Cancelled'),
    ], default='new')

    def __str__(self):
        return f"Order {self.id} by {self.customer_name}"

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    selected_options = models.JSONField(default=dict, null=True, blank=True)  
    def __str__(self):
        return f"{self.quantity} x {self.product.name} for Order {self.order.id}"
