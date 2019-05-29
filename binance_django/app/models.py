from django.db import models


class Binance(models.Model):
    symbol = models.CharField(max_length=10, unique=True, primary_key=True)
    price = models.CharField(max_length=15)
    refresh = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.symbol}'
