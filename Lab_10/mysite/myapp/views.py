from django.shortcuts import render
from django.views import View
from myapp.models import Message

# Create your views here.
class Home(View):
    def get(self, request):
        messages = Message.objects.all()
        return render(request, "index.html", {"messages":messages})

    def post(self, request):
        print("here")
        print("name is :: " + request.POST["name"])

        name = request.POST["name"]
        return render(request,"main/form.html",{"name":name})