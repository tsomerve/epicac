from django.db import models

class Poem(models.Model):
    first_question = models.CharField(max_length=2000)
    second_question = models.CharField(max_length=2000)

    def __str__(self):
        return str('{% lorem [10] [p] [random] %}')


class Memory(models.Model):
    first_response = models.CharField(max_length=2000) 
    second_response = models.CharField(max_length=2000)

