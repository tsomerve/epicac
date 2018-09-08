from django.urls import path

from .views import HomePageView, PoetryPageView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('about/', PoetryPageView.as_view(), name='poetry'),
]