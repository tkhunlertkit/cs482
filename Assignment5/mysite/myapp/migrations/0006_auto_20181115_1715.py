# Generated by Django 2.1.2 on 2018-11-15 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_auto_20181115_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='dob',
            field=models.DateField(auto_now_add=True),
        ),
    ]