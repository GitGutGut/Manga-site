from django.urls import path
from .views import *

urlpatterns = [
    path("", MangaAPI.as_view(), name="index"),
    path('manga-api/', MangaAPI.as_view(), name='manga-api'),
    path('user-registration/', UserRegistration.as_view(), name='user-registration'),
    path('user-login/', UserLogin.as_view(), name='user-login'),
    path('obtain-photo-url/', ObtainURLphoto.as_view(), name='obtain-photo-url'),
]