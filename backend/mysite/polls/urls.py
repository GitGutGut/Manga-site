from django.urls import path
from .views import *

urlpatterns = [
    path("", MangaAPI.as_view(), name="index"),
    path('manga-api/', MangaAPI.as_view(), name='manga-api'),
    path('manga-data-api/', MangaDataAPI.as_view(), name='manga-data-api'),
    path('user-registration/', UserRegistration.as_view(), name='user-registration'),
    path('user-login/', UserLogin.as_view(), name='user-login'),
    path('obtain-photo-url/', ObtainURLphoto.as_view(), name='obtain-photo-url'),
    path('chapter-api/', ChapterApi.as_view(), name='chapter-api')
]