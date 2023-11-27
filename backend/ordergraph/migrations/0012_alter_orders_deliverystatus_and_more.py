# Generated by Django 4.2.7 on 2023-11-21 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordergraph', '0011_productdetails_back_order_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='deliverystatus',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Delivered', 'Delivered'), ('Lost', 'Lost'), ('Shipped', 'Shipped')], default='Pending', max_length=50),
        ),
        migrations.AlterField(
            model_name='orders',
            name='deliverytype',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Delivered', 'Delivered'), ('Lost', 'Lost'), ('Shipped', 'Shipped')], default='Standard', max_length=50),
        ),
    ]