# Generated by Django 5.1.2 on 2024-10-21 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oradbaleApp', '0002_alter_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='selected_options',
            field=models.JSONField(blank=True, null=True),
        ),
    ]