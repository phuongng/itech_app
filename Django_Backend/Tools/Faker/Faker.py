from faker import Faker
import random
import json
from datetime import datetime

fake = Faker()

def generate_fake_data():
    products = [
        {"product_name": "ITPhone", "quantity": random.randint(1, 3)},
        # {"product_name": "ITPhone2", "quantity": random.randint(1, 3)},
        # {"product_name": "ITLaptop", "quantity": random.randint(1, 3)},
        # {"product_name": "ITDesktop", "quantity": random.randint(1, 3)},
        # {"product_name": "ITWatch", "quantity": random.randint(1, 3)},
        # {"product_name": "ITTab", "quantity": random.randint(1, 3)}
    ]

    order_date = fake.date_time_this_decade()
    order_date_str = order_date.strftime('%Y-%m-%dT%H:%M:%SZ')

    return {
        "orderdate": order_date_str,
        "deliverytype": fake.random_element(elements=("Standard", "3-Day", "Express")),
        "deliverystatus": fake.random_element(elements=("Pending", "Shipped", "Delivered", "Lost")),
        "paymentstatus": fake.random_element(elements=("Pending", "Paid")),
        "products": products,
        "customer_name": fake.random_element(elements=("Henry", 'Eliana', 'Bryan', 'Sunny', 'Phuong N', 'Bob')),
    }

# Creating a list of orders with new products
orders_list_with_all_products = [
    generate_fake_data() for _ in range(50)
]

# Export
with open('orders.json', 'w') as file:
    json.dump(orders_list_with_all_products, file, indent=2)

print("Orders exported to 'orders.json'")
