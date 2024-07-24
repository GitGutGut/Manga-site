import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";
import ChapterButton from "../components/chapterButton";
import { obtainChapter, obtainChapterPath } from '../api';

const Chapter = () => {
    const { mangaId, chapterId, index } = useParams();
    const [chapters, setChapters] = useState([]);
    const [filePath, setFilePath] = useState('');
    const [name, setName] = useState('');
    const [nextPrevChapter, setNextPrevChapter] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const chapterData = await obtainChapter(mangaId, chapterId);
                setChapters(chapterData.files);
                setFilePath(chapterData.chapterPath);
                setName(chapterData.name);

                const nextPrevChapterData = await obtainChapterPath(mangaId, index);
                setNextPrevChapter(nextPrevChapterData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [mangaId, chapterId, index]);

    return (
        <div className="ViewChapter">
            <Navbar />
            <div className="LinkBox">
                <a href='/'>Manga_site</a> {" > "}
                <a href={`/manga/${mangaId}`}>{name}</a> {" > "}
                <a href={`/manga/${mangaId}/${chapterId}/${index}`}>{`${name} chapter ${index}`}</a>
            </div>
            {nextPrevChapter && <ChapterButton
                mangaId={mangaId}
                nextPrevChapter={nextPrevChapter}
                index={index}
            />}
            <div className="Chapter">
                <h1>{name}</h1>
                {chapters.map((chapter, idx) => (
                    <img key={idx} src={`http://localhost:8000/${filePath}${chapter}`}
                        alt={`Photo ${idx + 1}`} className="PhotoItem" />
                ))}
            </div>
            <div className="EndChapter">
                <h1>End of the chapter</h1>
            </div>
            {nextPrevChapter && <ChapterButton
                mangaId={mangaId}
                nextPrevChapter={nextPrevChapter}
                index={index}
            />}
        </div>
    );
};

export default Chapter;
