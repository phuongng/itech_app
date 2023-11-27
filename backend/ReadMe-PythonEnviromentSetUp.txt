Read me!


1. Place the project in the desired directory 
2. Install Python (https://www.python.org/downloads/)
3. Run: 'pip install pipenv'
4. Run: 'pip install django'
5. Run: 'pip install djangorestframework'
6. Run "python -m pip install django-cors-headers"
7. Download MySQL CE "https://dev.mysql.com/downloads/file/?id=523158"
8. CD into project directory "....\ProjectFolder\Inventory"
9. Run 'python manage.py migrate'
10. Run 'python manage.py runserver
11. Create database schema named "ims" with the following creds, user: root password: password 
12. Import Stored Proedures and data from "..\Inventory\SQLQuery"





API Calls

Token Base authenication -
https://saasitive.com/tutorial/token-based-authentication-django-rest-framework-djoser/


api/users/ - to signup a new user
api/users/me/ - to get user information
api/token/login/ - to get toke
api/token/logout/ - to logout





Data API Calls -

admin/
api/ListOrders
api/TotalOrders
api/TopSelling
api/RecentlySold
api/OrdersInShipping
api/NumberOfOrdersDelivered
api/NumberOfOrdersPending
api/Total_Customers