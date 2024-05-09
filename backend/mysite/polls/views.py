from .models import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from django.conf import settings
from .fileEditor import *
import os

#NOT USED MAYBE DELETE LATER IF IT IS NOT BETTER FOR IMPLEMENTATION
class ObtainURLphoto(APIView):
    def get(self, request):
        """
        Return the photo of the manga
        """
        mangaid = request.query_params.get('id')
        photo = Photo.objects.get(mangaid= mangaid)
        photoURL = photo.file_path[7:]
        url = os.path.join(settings.STATIC_ROOT, photoURL.replace('/','\\'))
        return Response(url, status=status.HTTP_201_CREATED)


class ObtainChapter(APIView):
    def get(self, request):
        """
        Obtain the images of the chapter
        """
        chapterId = request.query_params.get('chapterId')
        mangaId = request.query_params.get('mangaId')

        manga = Manga.objects.get(id=mangaId)
        chapterPath = Chapters.objects.get(mangaid=mangaId).chapter_path + "/"
        chapterPath +=   chapterId + "/"
        chaptersPhotoList = getAllFilePaths(chapterPath)

        data = {
            'files': chaptersPhotoList,
            'chapterPath': chapterPath,
            'name': manga.name,
        }

        return Response(data, status=status.HTTP_202_ACCEPTED)



#Used for generating chapters of manga
class ChaptersApi(APIView):
    def get(self,request):
        mangaId = request.query_params.get('id')
        chapters = Chapters.objects.get(mangaid=mangaId)
        paths = getAllFilePaths(chapters.chapter_path)
        data = {
            "file_paths": paths
        }
        return Response(data, status=status.HTTP_201_CREATED)

class MangaDataAPI(APIView):
    def get(self, request):
        """
        Return manga and its chapters
        """
        mangaId = request.query_params.get('id')
        manga = Manga.objects.get(id=mangaId)
        if manga is None:
            return Response("It does not exist", status=status.HTTP_204_NO_CONTENT)
        
        chaptersPath = Chapters.objects.get(mangaid=mangaId).chapter_path
        photoPath = Photo.objects.get(mangaid=mangaId).file_path

        data = {
            'id': manga.id,
            'name': manga.name,
            'description':manga.description,
            'author': manga.author,
            'chapterAmount': manga.chapter_amount,
            'chapterPath': chaptersPath,
            'photoPath': photoPath,
        }
        return Response(data, status=status.HTTP_200_OK)


class MangaAPI(APIView):
    
    def get(self, request):
        """
        Return the list of all manga
        """
        mangaList = Manga.objects.all()
        mangaSerializer = MangaSerializer(mangaList, many=True)
        return Response(mangaSerializer.data, status=status.HTTP_202_ACCEPTED)

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
            
            mangaInstance = mangaSerializer.save()
            photoDir, episodesDir = addMangaToServer(zipFile, photo, mangaInstance)
        else:
            return Response(mangaSerializer.errors, status=status.HTTP_409_CONFLICT)
            
        createPhotoAndChapter(photoDir, episodesDir, mangaInstance)

        return Response("Created new manga.", status=status.HTTP_201_CREATED)


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