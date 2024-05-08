import zipfile
from io import BytesIO
from rest_framework.response import Response
from rest_framework import status
from .serializer import *

def addPhoto(photo, mangaName):
    dirName = 'static/photos/'+ mangaName +'.jpg'
    try:
        print("what")
        with open(dirName, 'wb') as photo_destination:
            for chunk in photo.chunks():
                photo_destination.write(chunk)
            
        return dirName
    
    except Exception as e:
        return  Response("Error in saving photo", status=status.HTTP_409_CONFLICT)


def addEpisodes(zipFile, mangaName):
    dirName = 'static/episodes/' + mangaName

    try:
        with zipfile.ZipFile(zipFile, 'r') as zip:
            zip.extractall(dirName)
        return dirName
    
    except Exception as e:
        return Response(e, status=status.HTTP_409_CONFLICT)


def addMangaToServer(zipFile, photo, mangaSerializer):
    mangaName = mangaSerializer.name

    photoDir = addPhoto(photo, mangaName)
    episodesDir = addEpisodes(zipFile, mangaName)

    return photoDir, episodesDir


def createPhotoAndChapter(photoDir, chapterDir, mangaInstance):
    photoData = {
    'title': mangaInstance.name,
    'file_path': photoDir,
    'mangaid': mangaInstance.id}
    chaptersData = {
        'mangaid': mangaInstance.id,
        'chapter_path' : chapterDir
    }

    photoSerializer = PhotoSerializer(data=photoData)
    chapterSerializer = ChaptersSerializer(data=chaptersData)

    if photoSerializer.is_valid():
        photoSerializer.save()
    if chapterSerializer.is_valid():
        chapterSerializer.save()
    

