# Generated by Django 4.2.7 on 2023-11-12 16:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ordergraph', '0007_rename_delivery_details_deliverydetails_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customers',
            old_name='Name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='customers',
            old_name='Street_address',
            new_name='street_address',
        ),
    ]
