from django.shortcuts import render
from django.views import View
from django.core import serializers
from django.http import JsonResponse
from myapp.models import User
from django.forms.models import model_to_dict

# Create your views here.
class Home(View):
    def get(self, request):
        users = User.objects.all().order_by("name")
        current_user = model_to_dict(users[0]) if users.count() > 0 else None
        return render(
            request,
            "index.html",
            {
                "current_user": current_user,
                "users": users,
            }
        )

    def post(self, request):
        post = request.POST
        user_name = post["name"]
        user = User.objects.filter(name=user_name)
        ret_usr = None

        if user.count() > 0:
            ret_usr = user[0]
            ret_usr.dob = post["dob"] if "dob" in post else ret_usr.dob
            ret_usr.level = post["level"] if "level" in post else ret_usr.level
            ret_usr.faction = post["faction"] if "faction" in post else ret_usr.faction
            ret_usr.save()


        else:
            if user_name:
                print("adding username :: " + user_name)
                user = User(name=user_name)
                user.save()
                ret_usr = user

        users = list(User.objects.values("name").order_by("name"))
        print(users)
        ret_usr = model_to_dict(ret_usr) if ret_usr else None

        return JsonResponse({
            "current_user": ret_usr,
            "users": users,
        })


class Page2(View):
    def get(self, request):
        data = dict(users=list(User.objects.values("name", "dob", "level", "faction").order_by('dob')))

        return render(request, 'page2.html', {"data": data})

    def post(self, request):
        data = dict(users=list(User.objects.values("name", "dob", "level", "faction").order_by('dob')))
        return JsonResponse(data)