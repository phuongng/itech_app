from django.urls import path
from . import views


urlpatterns = [
    path('api/ListOrders', views.order_list),
    path('api/TotalOrders', views.Total_Orders),
    path('api/TopSelling', views.TopSelling),
    path('api/RecentlySold', views.RecentlySold),
    path('api/OrdersInShipping', views.OrdersInShipping),
    path('api/NumberOfOrdersDelivered', views.NumberOfOrdersDelivered),
    path('api/NumberOfOrdersPending', views.NumberOfOrdersPending),
    path('api/Total_Customers', views.Total_Customers),
    path('api/Total_Products', views.Total_Products),
    path('api/Inventory_Summary', views.Inventory_Summary),
    path('api/Add_Product', views.AddProduct),
    path('api/ListStockTotals', views.ListStockTotals),
    path('api/ListAllCustomerOrders', views.ListAllCustomerOrders),
    path('api/AllOrderInfo', views.AllOrderInfoView.as_view(), name='AllOrderInfo'),
    path('api/GetCustomerDetails', views.GetCustomerDetails),
    path('api/SubmitOrder', views.AddOrderView.as_view()),
    path('api/ml', views.get_ml_data),

    
]