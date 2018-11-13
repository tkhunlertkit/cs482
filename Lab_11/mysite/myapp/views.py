from django.shortcuts import render
from django.views import View
from django.core import serializers
from django.http import JsonResponse
from myapp.models import User
from django.forms.models import model_to_dict

# Create your views here.
class Home(View):
    def get(self, request):
        users = User.objects.all()
        return render(request, "index.html", {"users": users})

    def post(self, request):

        ret_usr = []
        user_name = request.POST["name"]
        print(user_name)
        user = User.objects.filter(name=user_name)
        if user.count() > 0:
            ret_usr = user[0]
        else:
            print("name is :: " + user_name) 

            user = User(name=user_name)
            user.save()
            ret_usr = user

            print('query', '\n'.join([x.name for x in User.objects.all()]))
            print("dict :: ", type(user))

        
        return JsonResponse({"current_user": model_to_dict(user)})


    # def post(self, request):
    #     print("name is :: " + request.POST["name"]) 

    #     User(name=request.POST["name"]).save()

    #     print('query', '\n'.join([x.name for x in User.objects.all()]))
    #     data = dict(users=list(User.objects.values("name", "dob", "level", "faction").order_by('dob')))
        
    #     return JsonResponse(data)