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

class CountSerializerTotalProducts(serializers.Serializer):
   count_totalproducts = serializers.IntegerField()

class CountSerializerTotalCustomers(serializers.Serializer):
   count_totalcustomers = serializers.IntegerField()


class ProductDetailsSerializer(serializers.ModelSerializer):
    product_id = serializers.SerializerMethodField()
    class Meta:
        model = ProductDetails
        fields = '__all__'
    def get_product_id(self, obj):
        return f"PD-{obj.id}" if obj.id else None
    


class ProductDetailsSerializerForListProducts(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = ['product_name','description','in_stock_total']



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    customer_id = serializers.SerializerMethodField()
    class Meta:
        model = Customers
        fields = '__all__'

    def get_customer_id(self, obj):
        return f"USR-{obj.id}" if obj.id else None



class AllOrderSerializer(serializers.ModelSerializer):
    customer_id = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    tracking_id = serializers.SerializerMethodField()
    product_details = serializers.SerializerMethodField(source='get_product_details')
    order_id = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = [
            'order_id',
            'customer_id',
            'customer_name',
            'orderdate',
            'deliverytype',
            'deliverystatus',
            'paymentstatus',
            'ordertotal',
            'tracking_id',
            'product_details',
        ]

    def get_customer_id(self, obj):
        return f"USR-{obj.delivery_details.customer.id}" if obj.delivery_details else None

    def get_customer_name(self, obj):
        return obj.delivery_details.customer.name if obj.delivery_details else None

    def get_tracking_id(self, obj):
        return f"TRACK-{obj.delivery_details.tracking_id}" if obj.delivery_details else None

    def get_order_id(self, obj):
        return f"ORD-{obj.id}" if obj.id else None

    def get_product_details(self, obj):
        return [
            {
                'product_name': order_product.productdetails.product_name,
                'quantity': order_product.quantity
            }
            for order_product in obj.order_products.all()
        ]



class MLSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = [
            'orderdate',
            'ordertotal',
        ]

