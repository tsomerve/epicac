from django.urls import path

from .views import views

urlpatterns = [
    path('poetry/', PoetryPageView, name='poetry'),
]