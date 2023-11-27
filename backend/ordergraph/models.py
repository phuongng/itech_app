from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
#Customer Table
class Customers(models.Model):
        name = models.CharField(max_length=255)
        street_address = models.CharField(max_length=255)
        zip_code = models.IntegerField (max_length=5, validators=[MinLengthValidator(5)])
        city = models.CharField(max_length=255)
        state = models.CharField(max_length=255)
        dod = models.DateField(blank=True, null=True)
        phone_number = models.CharField(max_length=15, blank=True, null=True)

#Product Detail Table
class ProductDetails(models.Model):
        product_name = models.CharField(max_length=255)
        category = models.CharField(max_length=255)
        publish_status = models.BooleanField(default=True)
        retail_price = models.DecimalField(max_digits=7, decimal_places=2)
        unit_price = models.DecimalField(max_digits=7, decimal_places=2)
        description = models.TextField(null=True, blank=True)
        in_stock_total = models.PositiveIntegerField(default=0)
        back_order = models.BooleanField(default=False)

class Orders(models.Model):
    #Status
    DELIVERYSTATUS_PENDING='Pending'
    DELIVERYSTATUS_DELIVERED='Delivered'
    DELIVERYSTATUS_LOST='Lost'
    DELIVERYSTATUS_SHIPPED='Shipped'

    #Types
    DELIVERYTYPE_EXPRESS='Express'
    DELIVERYTYPE_3DAY='3-Day'
    DELIVERYTYPE_Standard="Standard"


    DELIVERYSTATUS_CHOICES = [
        (DELIVERYSTATUS_PENDING, 'Pending'),
        (DELIVERYSTATUS_DELIVERED, 'Delivered'),
        (DELIVERYSTATUS_LOST, 'Lost'),
        (DELIVERYSTATUS_SHIPPED, 'Shipped'),
    ]

    DELIVERYTYPE_CHOICES = [
        (DELIVERYTYPE_3DAY,'3-Day'),
        (DELIVERYTYPE_EXPRESS,'Express'),
        (DELIVERYTYPE_Standard,'Standard'),
    ]


    orderdate= models.DateTimeField(auto_now_add=True)
    deliverytype= models.CharField (max_length=50, choices= DELIVERYSTATUS_CHOICES, default=DELIVERYTYPE_Standard)
    ordertotal= models.DecimalField(max_digits=8, decimal_places=2)
    deliverystatus= models.CharField (max_length=50, choices=DELIVERYSTATUS_CHOICES, default=DELIVERYSTATUS_PENDING)
    customerreturn=models.BooleanField(default=False)
    customercanceled=models.BooleanField(default=False)
    damage=models.BooleanField(default=False)

#Order_Product Table
class OrderProduct(models.Model):
    quantity= models.PositiveIntegerField()
    orders=models.ForeignKey(Orders, on_delete=models.PROTECT, related_name='order_products')
    productdetails=models.ForeignKey(ProductDetails, on_delete=models.PROTECT, related_name='+')

#Delivery Details Table
class DeliveryDetails(models.Model):
    customer = models.ForeignKey(Customers, on_delete=models.PROTECT, related_name='delivery_details')
    tracking = models.OneToOneField(Orders, on_delete=models.PROTECT, primary_key=True, related_name='delivery_details')

