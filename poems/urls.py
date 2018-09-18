from django.urls import path

from .views import create_poem, generate_poem, save_poem

urlpatterns = [
    path('', create_poem, name='poetry'),
    path('save', save_poem, name='save_poem'),
    path('generate', generate_poem, name='generate_poem')
]