import { useState, useEffect, React } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { Link } from 'react-router-dom';


const Home = () => {
    const [mangaData, setmangaData] = useState([])

    useEffect(() => {
        fetchMangaData();
    }, []);



    const fetchMangaData = async () => {

        await axios.get("http://localhost:8000/polls/manga-api/", {
            params: "" // NEED THE INDEX TO NOT PULL FULL AMOUNT OF MANGA`S
        }).then(response => {
            console.log(response.data);
            setmangaData(response.data);
        }).catch(error => {
            console.error(error);
        }
        );
    }

    const createPhotoURL = (name) => {
        const base = "http://localhost:8000/static/photos/"
        const jpg = ".jpg"
        return base + name + jpg
    }

    return (

        <div className="home">
            <Navbar />

            <div className="mangaList">

                {mangaData.length > 0 && mangaData.map((manga) => (
                    <div className="Manga" key={manga.id}>
                        <Link to={`/manga/${manga.id}`}>
                            <img src={createPhotoURL(manga.name)} alt="Nothing found" />
                        </Link>
                        <div className="MangaDetails">
                            <div className="MangaTitle">{manga.name}</div>
                            <div className="MangaChapter">
                                {[0, 1, 2].map((item, key) => (
                                    manga.chapter_amount - item > 0 && (
                                        <a key={key} href={`/manga/${manga.id}/${manga.chapter_amount - item}`}>
                                            Chapter {manga.chapter_amount - item}
                                        </a>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                {!mangaData.length && <h1>No published manga.</h1>}

            </div>
        </div>);
}

export default Home;