from django.shortcuts import render
from .models import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
# Create your views here.

class MangaAPI(APIView):
    
    def get(self, request):
        """
        Return the list of all manga
        """
        pass

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
        pass