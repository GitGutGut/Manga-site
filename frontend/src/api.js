import axios from 'axios';

export const fetchMangaData = async (mangaId) => {
    try {
        const mangaResponse = await axios.get("http://localhost:8000/polls/manga-data-api/", {
            params: { id: mangaId }
        });
        const chapterResponse = await axios.get("http://localhost:8000/polls/chapters-api/", {
            params: { id: mangaId }
        });
        return { mangaData: mangaResponse.data, chapterData: chapterResponse.data.file_paths };
    } catch (error) {
        console.error(error);
    }
};

export const fetchComments = async (mangaId, username) => {
    try {
        const response = await axios.get("http://localhost:8000/polls/comment-api/", {
            params: { id: mangaId, username }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const uploadComment = async (comment) => {
    try {
        const response = await axios.post("http://localhost:8000/polls/comment-api/", comment);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteComment = async (id) => {
    try {
        const response = await axios.delete("http://localhost:8000/polls/comment-api/", {
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};