# Generated by Django 4.2.7 on 2023-11-26 21:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ordergraph', '0012_alter_orders_deliverystatus_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customers',
            name='dod',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customers',
            name='phone_number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='orderproduct',
            name='orders',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='order_products', to='ordergraph.orders'),
        ),
    ]
