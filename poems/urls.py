from django.urls import path

from .views import PoetryPageView

urlpatterns = [
    path('poetry/', PoetryPageView, name='poetry'),
]