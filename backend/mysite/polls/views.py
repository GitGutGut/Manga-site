from .models import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from .fileEditor import *

def checkArrayLimits(currIndex, chaptersList):
    if len(chaptersList) - 1 == currIndex:
        nextChapter = None
    else:
        nextChapter = chaptersList[currIndex + 1]

    if currIndex == 0:
        prevChapter = None
    else:
        prevChapter = chaptersList[currIndex - 1]
    
    return nextChapter, prevChapter
    
class changeChapter(APIView):
    def get(self, request):
        """
        Get the path to another 
        """
        mangaId = request.query_params.get('id')
        currentChapter = int(request.query_params.get('i')) - 1
        chapterPath = Chapters.objects.get(mangaid=mangaId).chapter_path
        chaptersList = getAllFilePaths(chapterPath)
        nextChapter, prevChapter = checkArrayLimits(currentChapter, chaptersList)
        

        data= {
            'nextChapter': nextChapter,
            'prevChapter': prevChapter,
        }

        return Response(data, status=status.HTTP_200_OK)

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

class UpdateManga(APIView):
    def post(self, request):
        """
        Use for updating a manga from the requested manga id
        """
        print(request.data)
        chapterFile = request.data.get("episodes")
        chapterAmount = request.data.get("chapterAmount")
        mangaId = request.data.get("mangaId")
        
        manga = Manga.objects.get(id=mangaId)
        manga.chapter_amount += int(chapterAmount)
        mangaChapterPath = Chapters.objects.get(mangaid=mangaId).chapter_path
        
        addEpisodes(chapterFile, mangaChapterPath)

        return Response("created", status=status.HTTP_200_OK)


class MangaDataAPI(APIView):

    def get(self, request):
        """
        Return manga and its chapters
        """
        mangaId = request.query_params.get('id')
        manga = Manga.objects.get(id=mangaId)
        if manga is None:
            return Response("It does not exist", status=status.HTTP_204_NO_CONTENT)
        print(manga.tags)
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
            'tags': manga.tags
        }
        return Response(data, status=status.HTTP_200_OK)


class MangaAPI(APIView):
        
    def patch(self, request):
        """
        Use for updating a manga from the requested manga id
        """
        
        chapterFile = request.FILES.get("episodes")
        mangaId = request.data.get("mangaId")
        chapterAmount = request.data.get("chapter_amount")
        manga = Manga.objects.get(id=mangaId)
        manga.chapter_amount += int(chapterAmount)
        manga.save()

        mangaChapterPath = Chapters.objects.get(mangaid=mangaId).chapter_path
    
        UpdateEpisodes(chapterFile, mangaChapterPath)
        return Response("created", status=status.HTTP_200_OK)
    
    def delete(self,request):
        """
        Delete the manga
        """
        mangaId = request.query_params.get('id')
        manga = Manga.objects.filter(id=mangaId).get()
        if manga is None:
            return Response("Not found manga", status=status.HTTP_404_NOT_FOUND)
        deleteFiles(manga)
        return Response("", status=status.HTTP_204_NO_CONTENT)

    
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
        
        if 'tags[]' in request.data:
            request.data.setlist('tags', request.data.getlist('tags[]'))
            request.data.pop('tags[]')
        request.data._mutable = False 

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
        return Response({'administrator': user.administrator, 'username':user.name})
    

class CommentAPI(APIView):
    def post(self, request):

        user = User.objects.get(name=request.data.get('username'))
        manga = Manga.objects.get(id=request.data.get('mangaid'))
        data = request.data.get("data")
        data = {
            'data': data,
           "mangaid": manga.id,
            "usere_mail": user.e_mail,
        }
        
        commentSerializer = Commentserializer(data=data)
        
        if commentSerializer.is_valid():
            commentSerializer.save()

            return Response(data, status=status.HTTP_200_OK)
        return Response("error", status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        print(request.query_params)
        mangaId = request.query_params.get('id')
        username = request.query_params.get('username')
        user = User.objects.filter(name=username).get()

        if user is None:
            return Response("No object", status=status.HTTP_400_BAD_REQUEST)
        
        comments = Comment.objects.filter(user_email=user.e_mail, mangaid=mangaId).all()
        commentsSerializer = Commentserializer(comments,many=True)
        comments = commentsSerializer.data
        for comment_data in comments:
            comment_data['user'] = User.objects.get(e_mail=comment_data['user_email']).name
        return Response(comments, status=status.HTTP_200_OK)