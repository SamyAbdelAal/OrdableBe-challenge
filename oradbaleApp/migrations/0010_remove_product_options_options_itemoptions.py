# Generated by Django 5.1.2 on 2024-10-21 20:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oradbaleApp', '0009_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='options',
        ),
        migrations.CreateModel(
            name='Options',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='oradbaleApp.product')),
            ],
        ),
        migrations.CreateModel(
            name='ItemOptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=50)),
                ('options', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='oradbaleApp.options')),
            ],
        ),
    ]
