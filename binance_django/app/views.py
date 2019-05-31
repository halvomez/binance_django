import json
from django.shortcuts import render
from binance.client import Client
from .models import Binance
from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
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

    prices = Binance.objects.all().order_by('symbol')

    return render(request, 'app/index.html', context={
        'prices': prices
    })


def switch(request):
    data = json.loads(request.body)
    with transaction.atomic():
        for symbol in data['symbol']:
            result = Binance.objects.get(symbol=symbol)
            result.refresh = not result.refresh
            result.save()

    return JsonResponse({'status': 1}, safe=False)
