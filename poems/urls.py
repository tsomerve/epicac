from django.urls import path

from .views import create_poem, generate_poem

urlpatterns = [
    path('', create_poem, name='poetry'),
    path('generate', generate_poem, name='generate_poem')
]