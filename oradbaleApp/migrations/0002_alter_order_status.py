# Generated by Django 5.1.2 on 2024-10-21 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oradbaleApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('accepted', 'Accepted'), ('cancelled', 'Cancelled')], default='new', max_length=50),
        ),
    ]
