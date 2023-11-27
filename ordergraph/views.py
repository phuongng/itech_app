from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Orders, Customers, ProductDetails, DeliveryDetails, OrderProduct, Orders
from .serializers import InventorySummarySerializer, CountSerializerTotalProducts,CountSerializerTotalCustomers , ProductDetailsSerializer,ProductDetailsSerializerForListProducts,OrderSerializer, AllOrderSerializer, CustomerSerializer
from django.db import connection
from rest_framework import status
# Create your views here.

#List Orders
@api_view()
def order_list(request):
  with connection.cursor() as cursor:
    cursor.callproc("get_orderlist")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
  return Response(data)
  
#List Number of total Orders
@api_view()
def Total_Orders(request):
 queryset = Orders.objects.count()
 return Response(queryset)

#List of top Products sold
@api_view()
def TopSelling(request):
  with connection.cursor() as cursor:
    cursor.callproc("get_TopSelling")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
  return Response(data)
  
#Number of Orders in Shipping
@api_view()
def OrdersInShipping(request):
  with connection.cursor() as cursor:
    cursor.callproc("get_OrdersInShipping")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    relable_data = [{"count_ordersinshipping": item.get("count(ordergraph_orders.id)")} for item in data]

  return Response(relable_data)

#Number of Orders Delivered
@api_view()
def NumberOfOrdersDelivered(request):
  with connection.cursor() as cursor:
    cursor.callproc("get_NumberOfOrdersDelivered")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    relable_data = [{"count_numberofordersdelivered": item.get("count(ordergraph_orders.id)")} for item in data]
  return Response(relable_data)

#Number of Orders Pending
@api_view()
def NumberOfOrdersPending(request):
  with connection.cursor() as cursor:
    cursor.callproc("get_NumberOfOrdersPending")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
  return Response(data)
   
#Total Number of Customers
@api_view(['GET'])
def Total_Customers(request):
    queryset = Customers.objects.count()
    serializer = CountSerializerTotalCustomers({'count_totalcustomers': queryset})
    return Response(serializer.data)
#Total Number of Products
@api_view()
def Total_Products(request):
  queryset = ProductDetails.objects.count()
  serializer = CountSerializerTotalProducts({'count_totalproducts': queryset})
  return Response(serializer.data)

@api_view()
def Inventory_Summary(request):
  queryset = ProductDetails.objects.all()
  serializer = InventorySummarySerializer(queryset, many=True)
  return Response(serializer.data)


@api_view()
def RecentlySold(request):
    with connection.cursor() as cursor:
        cursor.callproc("get_Recentlysold")
        columns = [col[0] for col in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return Response(data)


#Updating an item or adding if it does not exist
@api_view(['GET', 'POST'])
def AddProduct(request):
    if request.method == 'GET':
        # Retrieve all products
        products = ProductDetails.objects.all()
        serializer = ProductDetailsSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = ProductDetailsSerializer(data=request.data)
        if serializer.is_valid():
            product_name = serializer.validated_data.get("product_name")
            category = serializer.validated_data.get("category")
            publish_status = serializer.validated_data.get("publish_status")
            retail_price = serializer.validated_data.get("retail_price")
            unit_price = serializer.validated_data.get("unit_price")
            description = serializer.validated_data.get("description")
            # Check if the product already exists
            queryset = ProductDetails.objects.filter(product_name=product_name)

            if queryset.exists():
                product_details = queryset[0]
                product_details.category = category
                product_details.publish_status = publish_status
                product_details.retail_price =retail_price
                product_details.unit_price = unit_price
                product_details.description = description
                product_details.save(update_fields=['category','publish_status','retail_price','unit_price','description'])
            else:
                product_details = ProductDetails(product_name=product_name, category=category, publish_status=publish_status,
                                                 retail_price=retail_price, unit_price=unit_price,description=description)
                product_details.save()

            return Response(ProductDetailsSerializer(product_details).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      

#List Total of all in stock items
@api_view()
def ListStockTotals(request):
   queryset = ProductDetails.objects.values('product_name','description','in_stock_total')
   serializer = ProductDetailsSerializerForListProducts(queryset, many=True)
   return Response(serializer.data)

@api_view()
def ListStockTotals(request):
   queryset = ProductDetails.objects.values('product_name','description','in_stock_total')
   serializer = ProductDetailsSerializerForListProducts(queryset, many=True)
   return Response(serializer.data)


@api_view(['GET'])
def ListAllCustomerOrders(request):
    # Get all customer orders ordered from most recent to oldest
    orders = Orders.objects.all().order_by('-orderdate')
    serializer = OrderSerializer(orders, many=True)

    data = []
    for order_data in serializer.data:
        order_id = order_data['id']
        delivery_details = DeliveryDetails.objects.get(tracking_id=order_id)

        data.append({
            'customer_name': delivery_details.customer.name,
            'order_date':order_data['orderdate'],
            'delivery_type':order_data['deliverystatus'],
            'order_total':order_data['ordertotal'],
            'tracking_id': order_id,
            'delivery_status' : order_data['deliverystatus']
        })

    return Response(data)


class AllOrderInfoView(APIView):
    def get(self, request, *args, **kwargs):
        orders = Orders.objects.all()
        serializer = AllOrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view()
def GetCustomerDetails(request):
   customerdetails = Customers.objects.all()
   serializer = CustomerSerializer(customerdetails, many=True)
   return Response(serializer.data)