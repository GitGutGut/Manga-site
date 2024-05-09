from .models import *
from rest_framework import serializers
import re



class MangaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Manga
        fields = ['id', 'name', 'description', 'chapter_amount', 'author']

    def validate_name(self, value):
        if Manga.objects.filter(name=value).exists():
            raise serializers.ValidationError("Manga already exists")
        return value



class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ['id_integer', 'title', 'file_path', 'mangaid']

class ChaptersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapters
        fields = ['id','mangaid', 'chapter_path']

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