from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Orders, Customers, ProductDetails, DeliveryDetails, OrderProduct, Orders
from .serializers import InventorySummarySerializer, CountSerializerTotalProducts,CountSerializerTotalCustomers , ProductDetailsSerializer,ProductDetailsSerializerForListProducts,OrderSerializer, CustomerSerializer, AllOrderSerializer, MLSerializer
from django.db import connection, transaction
from rest_framework import status
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt
import base64
import io
import json
# Create your views here.

#List Orders
@api_view()
def order_list(request):
  with connection.cursor() as cursor:
    cursor.callproc("get_orderlist")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
  return Response(data)
  
#List Number of Total Orders
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
            in_stock_total = serializer.validated_data.get("in_stock_total")
            queryset = ProductDetails.objects.filter(product_name=product_name)
            #Checks to see if product exists, if it does the product will be added instead of duplicated
            if queryset.exists():
                product_details = queryset[0]
                product_details.category = category
                product_details.publish_status = publish_status
                product_details.retail_price =retail_price
                product_details.unit_price = unit_price
                product_details.description = description
                product_details.in_stock_total = in_stock_total
                product_details.save(update_fields=['category','publish_status','retail_price','unit_price','description','in_stock_total'])
            else:
                product_details = ProductDetails(product_name=product_name, category=category, publish_status=publish_status,
                                                 retail_price=retail_price, unit_price=unit_price,description=description, in_stock_total=in_stock_total)
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



#Add Orders
class AddOrderView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data

        # Extract customer_name and look up the existing customer
        customer_name = data.get('customer_name')

        try:
            customer = Customers.objects.get(name=customer_name)
        except Customers.DoesNotExist:
            return Response({'error': f'Customer with name {customer_name} does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        data['customer'] = customer.id
        data.pop('customer_name')

        # Calculate ordertotal
        products_data = data.get('products', [])
        ordertotal = sum(
            product_data.get('quantity', 0) * ProductDetails.objects.get(product_name=product_data['product_name']).unit_price
            for product_data in products_data
        )

        data['ordertotal'] = ordertotal

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    order = serializer.save()

                    for product_data in products_data:
                        product_name = product_data.get('product_name')
                        quantity = product_data.get('quantity')

                        # Look up the existing product by name
                        try:
                            product = ProductDetails.objects.get(product_name=product_name)
                        except ProductDetails.DoesNotExist:
                            raise Exception(f'Product {product_name} does not exist.')

                        # Create OrderProduct
                        OrderProduct.objects.create(
                            orders=order,
                            productdetails=product,
                            quantity=quantity
                        )

                    # Create DeliveryDetails Link
                    DeliveryDetails.objects.create(
                        customer=customer,
                        tracking=order
                    )

            except Exception as e:
                # Handle any other exceptions that might occur
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#Machine Learning (Work in progress)


@api_view()
def get_ml_data(request):
    with connection.cursor() as cursor:
        cursor.callproc("get_mldata")
        columns = [col[0] for col in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]

    df = pd.DataFrame(data)
    df['orderdate'] = pd.to_numeric(df['orderdate'])
    df['retail_price'] = pd.to_numeric(df['retail_price'], errors='coerce')
    X = df['orderdate']  
    y = df['retail_price']  
    X = sm.add_constant(X) 
    print(df)


    model = sm.OLS(y, X).fit() 
    summary = model.summary() 

    # Create a scatter plot
    plt.scatter(X.iloc[:, 1], y, label='Actual data')
    plt.plot(X.iloc[:, 1], model.predict(X), label='Fitted line', color='red')
    plt.xlabel('Order Date')
    plt.ylabel('Retail Price')
    plt.title('Linear Regression Fit')
    plt.legend()


    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)


    plot_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    plt.close()

   
    return render(request, 'ml_data_template.html', {
        'coefficients': json.dumps({
            'intercept': model.params[0],
            'slope': model.params[1]
        }, indent=2),
        'summary': model.summary().as_text(),
        'plot': plot_base64
    })
