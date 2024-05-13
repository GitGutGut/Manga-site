import { useState, useEffect, React } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { Link } from 'react-router-dom';

function replaceString(originalString, replacementString) {
    // Split the text by obtaining the length of the replacementString,
    // after that obtain the starting prefix so it can be added by the replacement.
    const length = replacementString.length;
    const prefix = originalString.slice(0, originalString.length - length);

    // Combine the prefix, replacement string
    const modifiedString = prefix + replacementString;

    return modifiedString;
}

const Home = () => {
    const [mangaData, setmangaData] = useState([])
    const [filter, setFilter] = useState('')
    const [mangaDataFiltered, setMangaDataFiltered] = useState([])

    useEffect(() => {
        fetchMangaData();

    }, []);

    useEffect(() => {
        setMangaDataFiltered(mangaData.filter((manga) => manga.name.toLowerCase()
            .includes(filter.toLowerCase())))
    }, [filter])

    const filterChange = (filter) => {
        setFilter(filter)
    }
    

    const fetchMangaData = async () => {

        await axios.get("http://localhost:8000/polls/manga-api/", {
            params: "" // NEED THE INDEX TO NOT PULL FULL AMOUNT OF MANGA`S
        }).then(response => {
            console.log(response.data);
            setmangaData(response.data);
            setMangaDataFiltered(response.data);
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
            <Navbar filterFunc={filterChange} />

            <div className="mangaList">

                {mangaDataFiltered.length > 0 && mangaDataFiltered.map((manga) => (
                    <div className="Manga" key={manga.id}>
                        <Link to={`/manga/${manga.id}`}>
                            <img src={createPhotoURL(manga.name)} alt="Nothing found" />
                        </Link>
                        <div className="MangaDetails">
                            <div className="MangaTitle">
                                {manga.name}
                            </div>
                            <div className="MangaChapter">
                                { [0, 1, 2].map((item, key) => (
                                    manga.chapter_amount - item > 0 && (
                                        <a key={key} href={`/manga/${manga.id}/${replaceString("c000", String(manga.chapter_amount - item))}/${manga.chapter_amount - item}`}>
                                            Chapter {manga.chapter_amount - item}
                                        </a>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                {!mangaData.length && !mangaDataFiltered.length && <h1>No published manga.</h1>}
                {!mangaDataFiltered.length && <h1>Nothing found.</h1>}
            </div>
        </div>);
}

export default Home;