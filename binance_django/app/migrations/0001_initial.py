# Generated by Django 2.2.1 on 2019-05-29 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Binance',
            fields=[
                ('symbol', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('price', models.CharField(max_length=15)),
                ('refresh', models.BooleanField(default=True)),
            ],
        ),
    ]