from django.db import models

# Create your models here.
class MyModel(models.Model):
    fieldOne = models.CharField(max_length=10)
    fieldTwo = models.IntegerField(default=0)
