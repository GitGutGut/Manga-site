from django.urls import path
from .views import *

urlpatterns = [
    path("", MangaAPI.as_view(), name="index"),
    path('manga-api/', MangaAPI.as_view(), name='manga-api'),
    path('manga-data-api/', MangaDataAPI.as_view(), name='manga-data-api'),
    path('user-registration/', UserRegistration.as_view(), name='user-registration'),
    path('user-login/', UserLogin.as_view(), name='user-login'),
    path('chapters-api/', ChaptersApi.as_view(), name='chapters-api'),
    path('obtain-chapter/', ObtainChapter.as_view(), name="obtain-chapter"),
    path('change-chapter/', changeChapter.as_view(), name="change-chapter"),
]