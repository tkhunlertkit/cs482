from django.db import models

# Create your models here.
class Visit(models.Model):
    ip_addr = models.CharField(max_length=20)
    browser = models.CharField(max_length=30)
    timestamp = models.DateTimeField(auto_now=True)