from django.db import models

class Poem(models.Model):
    poetry = models.TextField(max_length=400) 


