from rest_framework import serializers
from .models import ProductDetails, Orders,DeliveryDetails, Customers,OrderProduct


class Orders_Shipping(serializers.Serializer):
     deliverystatus = serializers.CharField()
   
#Used by InventorySummary
class InventorySummarySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    product_name = serializers.CharField(max_length=255)
    category = serializers.CharField(max_length=255)
    publish_status = serializers.BooleanField(default=True)
    retail_price = serializers.DecimalField(max_digits=7, decimal_places=2)
    unit_price = serializers.DecimalField(max_digits=7, decimal_places=2)
    in_stock_total = serializers.IntegerField()

#Used to count Total Products and Total Customers
class CountSerializerTotalProducts(serializers.Serializer):
   count_totalproducts = serializers.IntegerField()

class CountSerializerTotalCustomers(serializers.Serializer):
   count_totalcustomers = serializers.IntegerField()


class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = '__all__'


class ProductDetailsSerializerForListProducts(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = ['product_name','description','in_stock_total']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'





class AllOrderSerializer(serializers.ModelSerializer):
    customer_id = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    tracking_id = serializers.SerializerMethodField()
    product_names = serializers.SerializerMethodField(source='get_product_names')
    order_id = serializers.IntegerField(source='id') 

    class Meta:
        model = Orders
        fields = [
            'order_id', 
            'customer_id',
            'customer_name',
            'orderdate',
            'deliverytype',
            'deliverystatus',
            'ordertotal',
            'tracking_id',
            'product_names',
        ]

    def get_customer_id(self, obj):
        return obj.delivery_details.customer.id if obj.delivery_details else None

    def get_customer_name(self, obj):
        return obj.delivery_details.customer.name if obj.delivery_details else None

    def get_tracking_id(self, obj):
        return obj.delivery_details.tracking_id if obj.delivery_details else None

    def get_product_names(self, obj):
        return [order_product.productdetails.product_name for order_product in obj.order_products.all()]