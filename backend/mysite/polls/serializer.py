from .models import *
from rest_framework import serializers
from django.db import transaction
import re



class MangaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Manga
        fields = ['id', 'name', 'description', 'chapter_amount', 'author']

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ['id_integer', 'title', 'file_path', 'mangaid']

class ChaptersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapters
        fields = ['id','mangaid', 'chapter_path']

# class FullMangaSerializer(serializers.Serializer):
    
#     manga_name = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
#     manga_description = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
#     manga_chapter_amount = serializers.IntegerField(allow_null=True)
#     manga_author = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
#     chapter_file = serializers.FileField()
#     manga_photo = serializers.ImageField()

#     def create(self, data):
#         mangaName = data['name']
#         description = data['description']
#         chapterAmount = data['chapter_amount']
#         author = data['author']
#         photoPath = data['photo_path']
#         chaptersPath = data['chapters_path']

#         with transaction.atomic():
#             manga_instance = Manga.objects.create(
#                 name=mangaName,
#                 description=description,
#                 chapter_amount=chapterAmount,
#                 author=author
#             )

#             photo_instance = Photo.objects.create(
#                 title=mangaName,  
#                 file_path=photoPath,
#                 mangaid=manga_instance.id 
#             )

#             chapters_amount = Chapters.objects.create(
#                 mangaid = manga_instance.id,
#                 chapters_path=chaptersPath
#             )
        
#         return manga_instance.id


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['e_mail', 'password', 'name']

    def create(self, data):
        return User.objects.create(**data)
    
    def validate_e_mail(self, value):
        pattern = r'^[\w\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Email in invalid format")
        return value
    
    def validate_name(self, value):
        if User.objects.filter(name=value).exists():
            raise serializers.ValidationError("Name already exists")
        if len(value) > 32 or len(value) == 0:
            raise serializers.ValidationError("Name is incorrect format")
        return value
    
    def validate_password(self, value):
        if len(value) < 7:
            raise serializers.ValidationError("Password length is less than 7")
        
        return value