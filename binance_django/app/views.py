from django.shortcuts import render
from binance.client import Client


def index(request):
    api_key = 'UlkP3TPyMyicFkLzs5naHx9gWvi7W39A3CIdHnWl0yGLG5Yoow9y8SmNn7XFDsrS'
    secret_key = 'IvXFouzzfA149RMYuu9FryUt7N3Bj4bVzZbd7A9JTxNM0tWzCigEvukpy5CumbQ3'

    client = Client(api_key, secret_key)
    prices = client.get_all_tickers()

    return render(request, 'app/index.html', context={
        'prices': prices
    })
