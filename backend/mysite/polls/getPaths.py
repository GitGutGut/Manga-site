import os

def getAllFilePaths(directory):
    file_paths = []

    for file_name in os.listdir(directory):
        file_paths.append(file_name)
    
    return file_paths