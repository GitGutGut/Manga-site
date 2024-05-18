import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import Navbar from "../components/navbar";
import axios from "axios";
import ChapterButton from "../components/chapterButton";

const Chapter = ({ }) => {
    const { mangaId, chapterId, index } = useParams();
    const [chapters, setChapters] = useState();
    const [filePath, setFilePath] = useState();
    const [name, setName] = useState();
    const [nextPrevChapter, setnextPrevChapter] = useState();

    useEffect(() => {
        obtainChapter();
        obtainChapterPath();
    }, []);

    const obtainChapter = async () => {
        await axios.get("http://localhost:8000/polls/obtain-chapter/", {
            params: {
                chapterId: chapterId,
                mangaId: mangaId
            }
        }).then(response => {
            console.log(response);
            setChapters(response.data.files);
            setFilePath(response.data.chapterPath);
            setName(response.data.name)
        }
        ).catch(error => {
            console.error(error);
        }
        )
    }
    const obtainChapterPath = async () => {
        await axios.get("http://localhost:8000/polls/change-chapter/", {
            params: {
                i: index,
                id: mangaId,
            }
        }).then(response => {
            console.log(response)
            setnextPrevChapter(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

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
                {chapters?.map((chapter, index) => (
                    <img key={index} src={`http://localhost:8000/${filePath}${chapter}`}
                        alt={`Photo ${index + 1}`} className="PhotoItem" />
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
            <h1>KUKAJ DEBIL</h1>

        </div>
    );
}

export default Chapter;