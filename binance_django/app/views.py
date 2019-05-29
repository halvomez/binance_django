from django.shortcuts import render
from binance.client import Client
from .models import Binance
from django.db import transaction


def index(request):
    api_key = 'UlkP3TPyMyicFkLzs5naHx9gWvi7W39A3CIdHnWl0yGLG5Yoow9y8SmNn7XFDsrS'
    secret_key = 'IvXFouzzfA149RMYuu9FryUt7N3Bj4bVzZbd7A9JTxNM0tWzCigEvukpy5CumbQ3'

    client = Client(api_key, secret_key)
    data = client.get_all_tickers()

    with transaction.atomic():
        for item in data:
            result = Binance(symbol=item['symbol'], price=item['price'])
            try:
                record = Binance.objects.get(symbol=item['symbol'])

                if record and record.refresh is True:
                    result.save()
            except Binance.DoesNotExist:
                result.save()

    prices = Binance.objects.all()

    return render(request, 'app/index.html', context={
        'prices': prices
    })
