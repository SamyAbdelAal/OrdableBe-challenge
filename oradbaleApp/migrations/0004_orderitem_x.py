# Generated by Django 5.1.2 on 2024-10-21 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oradbaleApp', '0003_orderitem_selected_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='x',
            field=models.CharField(default='q', max_length=255),
            preserve_default=False,
        ),
    ]
