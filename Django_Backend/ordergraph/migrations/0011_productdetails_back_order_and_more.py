# Generated by Django 4.2.7 on 2023-11-19 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordergraph', '0010_productdetails_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='productdetails',
            name='back_order',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='productdetails',
            name='in_stock_total',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
