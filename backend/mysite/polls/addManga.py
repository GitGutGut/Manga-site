import zipfile
from io import BytesIO
from rest_framework.response import Response
from rest_framework import status


def addPhoto(photo, mangaName):
    dirName = '../photo/'+ mangaName +'.jpg'
    try:
        with open(dirName, 'wb') as photo_destination:
            for chunk in photo.chunks():
                photo_destination.write(chunk)
            
        return dirName
    
    except Exception as e:
        return  Response("Error in saving photo", status=status.HTTP_409_CONFLICT)


def addEpisodes(zipFile, mangaName):
    dirName = '../episodes/' + mangaName

    try:
        
        with zipfile.ZipFile(zipFile, 'r') as zip:
            zip.extractall(dirName)

        return dirName
    except Exception as e:
        return Response(e, status=status.HTTP_409_CONFLICT)


def addMangaToServer(zipFile, photo, mangaSerializer):
    mangaName = mangaSerializer.data.get('name')
    mangaId = mangaSerializer.data.get('id')

    photoDir = addPhoto(photo, mangaName)
    episodesDir = addEpisodes(zipFile, mangaName)

    return photoDir, episodesDir


    
