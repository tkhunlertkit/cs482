import pytz
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse

from .models import Visit

def index(request):

    current_time = datetime.now().replace(tzinfo=pytz.timezone('US/Central'))
    v = Visit(
        ip_addr=request.META['REMOTE_ADDR'],
        browser=request.META['HTTP_USER_AGENT'],
    )
    v.save()
    # print(request.META['HTTP_USER_AGENT'])
    # print(request.META['REMOTE_ADDR'])
    # print(current_time)
    # print(datetime.now())
    for vi in Visit.objects.all():
        print(vi)
    context = {'visits': Visit.objects.all()}
    return render(request, 'index.html', context=context)