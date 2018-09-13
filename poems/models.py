from django.db import models

class Poem(models.Model):
    poetry = models.TextField(max_length=400) 


class Memory(models.Model):
    first_response = models.CharField(max_length=2000) 
    second_response = models.CharField(max_length=2000)

