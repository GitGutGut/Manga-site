from django.shortcuts import render
from .models import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from .addManga import addMangaToServer
# Create your views here.

class MangaAPI(APIView):
    
    def get(self, request):
        """
        Return the list of all manga
        """
        pass

    def post(self, request):
        """
        Send new manga
        """
        
        photo = request.FILES.get('photo')
        zipFile = request.FILES.get('episodes')
        request.data.pop('photo')
        request.data.pop('episodes')
        mangaSerializer = MangaSerializer(data=request.data)
        if mangaSerializer.is_valid():
            photoDir, episodesDir = addMangaToServer(zipFile, photo, mangaSerializer)

        

        return Response("something", status=status.HTTP_201_CREATED)


class UserRegistration(APIView):
    
    # User is registering to the site
    def post(self, request): 
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogin(APIView):
    # User is logging to the site
    def post(self, request):
        email = request.data.get('e_mail')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(e_mail=email)

            if user.password != password:
                return Response({'message': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'message': 'Login successfull'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request):
        e_mail = request.query_params.get('e_mail')
        user = User.objects.get(e_mail=e_mail)
        administrator = user.administrator
        return Response({'administrator': administrator})