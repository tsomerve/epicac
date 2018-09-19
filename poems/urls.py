from django.urls import path
# from django.conf.urls import urls
# from  .poems import views as poems_views

from .views import create_poem, generate_poem, save_poem, user_signup, detail_poem

urlpatterns = [
    path('', create_poem, name='poetry'),
    path('save', save_poem, name='save_poem'),
    path('generate', generate_poem, name='generate_poem'),
    path('signup/', user_signup, name='signup'),
    path('detail/<str:pk>', detail_poem, name='detail')
]