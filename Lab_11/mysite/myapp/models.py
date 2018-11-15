from datetime import date
from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=20, blank=False)
    dob = models.DateField(default=date.today)
    level = models.IntegerField(default=0)
    faction = models.CharField(max_length=20, blank=True)
