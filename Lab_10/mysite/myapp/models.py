from django.db import models

# Create your models here.
class Message(models.Model):
    name = models.CharField(max_length=20)
    content = models.CharField(max_length=140)
    timestamp = models.DateTimeField(auto_now=True)
