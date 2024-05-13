import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import { useAuth } from './authContext';
import PopUpWindows from './popUpWindow.js';

const Manga = () => {
    const { mangaId } = useParams();
    const [mangaData, setMangaData] = useState();
    const [chapterData, setChapterData] = useState();
    const { authData } = useAuth();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        data: "",
        mangaid: mangaId,
        username: authData.username,
    })


    useEffect(() => {
        fetchMangaData();
    }, [mangaId]);

    useEffect(() => {
        fetchComments();
    }, []);


    const fetchMangaData = async () => {
        await axios.get("http://localhost:8000/polls/manga-data-api/", {
            params: {
                id: mangaId
            }
        }).then(response => {
            setMangaData(response.data)
        }).catch(error => {
            console.error(error)
        })

        await axios.get("http://localhost:8000/polls/chapters-api/", {
            params: {
                id: mangaId
            }
        }
        ).then(response => {
            setChapterData(response.data.file_paths)
        }).catch(error => {
            console.error(error)
        });
    }

    const fetchComments = async () => {
        await axios.get("http://localhost:8000/polls/comment-api/", {
            params: {
                id: mangaId,
                username: authData.username,
            }
        }).then(response => {
            console.log(response)
            setComments(response.data)

        }).catch(error => {
            console.error(error)
        })
    }

    const uploadComment = async () => {
        await axios.post("http://localhost:8000/polls/comment-api/", comment)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.error(error)
            })
    }

    const changeComment = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
        console.log(comment)
    }
    return (
        <div className='MangaSite'>
            <Navbar />
            <div className='MangaView'>

                {authData.isAdministrator &&
                    <div className='AdministratorFunc'>
                        <a href={`/manga/${mangaId}/update`}>
                            <button className='UpdateButton' type='button' onClick={console.log("sendToUpdate")}>Update</button>
                        </a>
                        <PopUpWindows />

                    </div>}
                <div className='MangaContent'>
                    <img src={`http://localhost:8000/${mangaData?.photoPath}`}
                        alt={mangaData?.name} className="MangaImage" />
                    <div className='MangaDetails'>
                        <h1>{mangaData?.name}</h1>
                        <h2>Author: {mangaData?.author}</h2>
                        <h2>Chapters: {mangaData?.chapterAmount}</h2>
                        <div className='TagTemplate'>
                            <h2>Tags: </h2>
                            {mangaData?.tags.map((tag, index) => (
                                <button key={index} className='tagButton'>{tag}</button>
                            ))}
                        </div>
                        <p><b>Description:</b> {mangaData?.description}</p>
                    </div>
                </div>

                <div className='ChapterTitle'>
                    <h3>Chapters</h3>
                </div>
                <div className='ChapterList'>
                    {chapterData?.map((path, index) => (
                        <a key={index} href={`/manga/${mangaId}/${path}/${index + 1}`}>Chapter {index + 1}</a>
                    ))}
                </div>
                <div className='CommentsTitle'>
                    <h3>Comments</h3>
                </div>
                <div className='Comments'>
                    {comments?.map((comment) => (
                        <div className="comment-item" key={comment.id}>
                            <div className="user-avatar" style={{ backgroundImage: `url(${comment.userAvatar})` }}></div>
                            <div className="comment-content">
                                <div className="comment-author">{comment.user}</div>
                                <div className="comment-date">{comment.date}</div>
                                <div className="comment-text">{comment.data}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <input className='CommentData' name="data" onChange={changeComment}></input>
                <button className='AddComment' onClick={uploadComment}>Add a Comment</button>

            </div>
        </div>
    );
}

export default Manga;