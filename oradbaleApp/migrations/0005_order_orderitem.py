# Generated by Django 5.1.2 on 2024-10-21 17:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oradbaleApp', '0004_orderitem_x'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='orderItem',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, related_name='orderItems', to='oradbaleApp.orderitem'),
            preserve_default=False,
        ),
    ]
