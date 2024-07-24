import axios from 'axios';

export const fetchMangaList = async () => {
    try {
        const response = await axios.get("http://localhost:8000/polls/manga-api/");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
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

export const addManga = async (mangaInformation) => {
    try {
        const response = await axios.post("http://localhost:8000/polls/manga-api/",
            mangaInformation, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Response: ", response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8000/polls/user-login/", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkIfAdministrator = async (email) => {
    try {
        const response = await axios.get("http://localhost:8000/polls/user-login/", {
            params: { e_mail: email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8000/polls/user-registration/", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtainChapter = async (mangaId, chapterId) => {
    try {
        const response = await axios.get("http://localhost:8000/polls/obtain-chapter/", {
            params: {
                chapterId,
                mangaId
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const obtainChapterPath = async (mangaId, index) => {
    try {
        const response = await axios.get("http://localhost:8000/polls/change-chapter/", {
            params: {
                i: index,
                id: mangaId,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateManga = async (mangaId, mangaUpdate) => {
    try {
        const formData = new FormData();
        formData.append('chapter_amount', mangaUpdate.chapter_amount);
        formData.append('episodes', mangaUpdate.episodes);

        const response = await axios.patch(`http://localhost:8000/polls/manga-api/${mangaId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};