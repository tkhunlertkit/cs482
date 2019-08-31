from datetime import date
from django.db import models

# Create your models here.
class State(models.Model):
    name = models.CharField(max_length=20)

class Option(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    text = models.CharField(max_length=20)
    next_state = models.ForeignKey(State)