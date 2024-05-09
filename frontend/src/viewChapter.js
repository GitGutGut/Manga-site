import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./navbar";
import axios from "axios";

const Chapter = ({index}) => {
    const { mangaId, chapterId } = useParams();
    const [chapters, setChapters] = useState();
    const [filePath, setFilePath] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        obtainChapter();
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

    return (
        <div className="ViewChapter">
            <Navbar />
            <div className="LinkBox">
                <a href='/'>Manga_site</a> {" > "}
                <a href={`/manga/${mangaId}`}>{name}</a> {" > "}
                <a href={`/manga/${mangaId}/${chapterId}`}>{`${name} chapter ${index}`}</a>
                <></>
            </div>
            <div className="Chapter">
                <h1>{name}</h1>
                {chapters?.map((chapter, index) => (
                    <img key={index} src={`http://localhost:8000/${filePath}${chapter}`} alt={`Photo ${index + 1}`} className="PhotoItem" />
                ))}
            </div>
            <h1>KUKAJ DEBIL</h1>

        </div>
    );
}

export default Chapter;