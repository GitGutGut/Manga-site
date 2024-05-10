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
    const { authData, updateAuthData } = useAuth();
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        fetchMangaData();
    }, [mangaId]);

    const fetchMangaData = async () => {
        await axios.get("http://localhost:8000/polls/manga-data-api/", {
            params: {
                id: mangaId
            }
        }).then(response => {
            console.log(response)
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
            console.log(response)
            setChapterData(response.data.file_paths)
        }).catch(error => {
            console.error(error)
        });
    }



    return (
        <div className='MangaSite'>
            <Navbar />
            <div className='MangaView'>
                
                {authData.isAdministrator &&
                    <div className='AdministratorFunc'>
                                
                        <button className='Update' type='button' onClick={"Transfer to update page"}>Update</button>
                        <PopUpWindows/>

                    </div>}
                <div className='MangaContent'>
                    <img src={`http://localhost:8000/${mangaData?.photoPath}`}
                        alt={mangaData?.name} className="MangaImage" />
                    <div className='MangaDetails'>
                        <h1>{mangaData?.name}</h1>
                        <h2>Author: {mangaData?.author}</h2>
                        <h2>Chapters: {mangaData?.chapterAmount}</h2>
                        <p>Description: {mangaData?.description}</p>
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

                </div>
            </div>
        </div>
    );
}

export default Manga;