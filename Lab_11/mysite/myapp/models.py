from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=20)
    dob = models.DateTimeField(auto_now=True)
    level = models.IntegerField(default=0)
    faction = models.CharField(max_length=20)
