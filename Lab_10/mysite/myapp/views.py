from django.shortcuts import render
from django.views import View
from myapp.models import Message
from django.core import serializers
from django.http import JsonResponse

# Create your views here.
class Home(View):
    def get(self, request):
        messages = Message.objects.all()
        return render(request, "index.html", {"messages": messages})

    def post(self, request):
        try:
            Message(
                name=request.POST["name"], 
                content=request.POST["message"]
            ).save()
        except:
            pass

        messages = Message.objects.all()
        data = dict(messages=list(Message.objects.values("name", "content", "timestamp").order_by('timestamp')))
        
        return JsonResponse(data)