from django.contrib import admin
from .models import Product, Order,OrderItem,ProductOptions,Options

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description','display_image')  
    search_fields = ('name',)  
    def display_image(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="width: 100px; height: auto;" />'
        return "No Image"
    display_image.allow_tags = True
    display_image.short_description = 'Image'



class OrderItemInline(admin.TabularInline):
    model = OrderItem
    fields = ('product', 'quantity', 'price_at_purchase', 'selected_options') 
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','customer_name', 'customer_email', 'created_at', 'status')  
    search_fields = ('customer_name',)
    inlines = [OrderItemInline]  
@admin.register(ProductOptions)
class ProductOptionsAdmin(admin.ModelAdmin):
    list_display = ['options',
                    'value',
                    'extra_price']
    list_filter = ['options', 'options__product']
    search_fields = ['value']


class ProductOptionsInLineAdmin(admin.TabularInline):
    model = ProductOptions


@admin.register(Options)
class OptionsAdmin(admin.ModelAdmin):
    list_display = ['product',
                    'name']
    list_filter = ['product']
    search_fields = ['name']
    inlines = [ProductOptionsInLineAdmin]


admin.site.register(OrderItem)  