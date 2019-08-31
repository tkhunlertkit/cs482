from django.shortcuts import render
from django.views import View
from django.core import serializers
from django.http import JsonResponse
from myapp.models import State, Option
from django.forms.models import model_to_dict

# Create your views here.
class Home(View):
    def get(self, request):
        
        return render(request, "index.html")

    def post(self, request):
        post = request.POST
        state_name = post["statename"]
        request.POST["state_id"]
        options = list(Option.objects.filter(state__name=state_name))

        return JsonResponse({
            "options": options,
            "question": state.text,
        })


class Page2(View):
    def get(self, request):
        data = dict(users=list(User.objects.values("name", "dob", "level", "faction").order_by('dob')))

        return render(request, 'page2.html', {"data": data})

    def post(self, request):
        data = dict(users=list(User.objects.values("name", "dob", "level", "faction").order_by('dob')))
        return JsonResponse(data)