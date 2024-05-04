from .models import *
from rest_framework import serializers
from django.db import transaction
import re



class MangaSerializer(serializers.ModelSerializer):

    def create(self, data):
        return super.create(data)

    def get(self, data,new_data):
        pass
    
    class Meta:
        model = Manga
        fields = ['name', 'description', 'chapter_amount', 'author']


class FullMangaSerializer(serializers.Serializer):
    
    manga_name = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    manga_description = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    manga_chapter_amount = serializers.IntegerField(allow_null=True)
    manga_author = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    chapter_path = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    photo_file_path = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)

    def create(self, data):
        manga_name = data['name']
        description = data['description']
        chapter_amount = data['chapter_amount']
        author = data['author']
        photo_path = data['photo_path']
        chapters_path = data['chapters_path']

        with transaction.atomic():
            manga_instance = Manga.objects.create(
                name=manga_name,
                description=description,
                chapter_amount=chapter_amount,
                author=author
            )

            photo_instance = Photo.objects.create(
                title=manga_name,  
                file_path=photo_path,
                mangaid=manga_instance.id 
            )

            chapters_amount = Chapters.objects.create(
                mangaid = manga_instance.id,
                chapters_path=chapters_path
            )
        
        return manga_instance.id


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
        if len(value) > 32:
            raise serializers.ValidationError("Name too long")
        return value
    
    def validate_password(self, value):
        if len(value) < 7:
            raise serializers.ValidationError("Password length is less than 7")
        
        return value