# Generated by Django 4.2.7 on 2023-11-04 17:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ordergraph', '0003_alter_customers_zip_code_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='delivery_details',
            old_name='tracking_id',
            new_name='tracking',
        ),
    ]
