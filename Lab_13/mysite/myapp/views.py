from django.shortcuts import render
from django.views import View
from myapp.models import User
from django.core import serializers
from django.http import JsonResponse

# Create your views here.
class Home(View):
    def get(self, request):
        return render(request, "index.html")

    def post(self, request):
        print(request)
        User(username=request.POST["username"]).save()
        
        users = User.objects.all()
        data = dict(users=list(User.objects.values("username")))
        
        return JsonResponse(data)