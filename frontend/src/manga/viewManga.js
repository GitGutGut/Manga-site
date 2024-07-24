
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useAuth } from '../components/authContext';
import PopUpWindows from '../components/popUpWindow';
import MangaDetails from '../components/mangaDetails';
import CommentSection from '../components/commentSection';
import { fetchMangaData } from '../api';

const Manga = () => {
    const { mangaId } = useParams();
    const [mangaData, setMangaData] = useState();
    const [chapterData, setChapterData] = useState();
    const { authData } = useAuth();

    useEffect(() => {
        (async () => {
            const { mangaData, chapterData } = await fetchMangaData(mangaId);
            setMangaData(mangaData);
            setChapterData(chapterData);
        })();
    }, [mangaId]);

    return (
        <div className='MangaSite'>
            <Navbar />
            <div className='MangaView'>
                {authData.isAdministrator && (
                    <div className='AdministratorFunc'>
                        <a href={`/manga/${mangaId}/update`}>
                            <button className='UpdateButton' type='button'>Update</button>
                        </a>
                        <PopUpWindows />
                    </div>
                )}
                {mangaData && <MangaDetails mangaData={mangaData} />}
                <div className='ChapterTitle'>
                    <h3>Chapters</h3>
                </div>
                <div className='ChapterList'>
                    {chapterData?.map((path, index) => (
                        <a key={index} href={`/manga/${mangaId}/${path}/${index + 1}`}>Chapter {index + 1}</a>
                    ))}
                </div>
                <CommentSection mangaId={mangaId} />
            </div>
        </div>
    );
}

export default Manga;
