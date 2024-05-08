import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from './authContext';
import axios from "axios";

const Home = () => {
    const [mangaData, setmangaData] = useState([])
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const baseUrl = process.env.REACT_APP_BACKEND_URL + "/static/photo/";
    const jpg = ".jpg";

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
            <Navbar/>
            
            <div className="mangaList">

                {mangaData.map((manga, index) => (
                    <div className="Manga" key={manga.id}>
                        <img src={createPhotoURL(manga.name)} alt="WOT" />
                        <div className="MangaDetails">
                            <div className="MangaTitle">{manga.name}</div>
                            <div className="MangaChapter">
                                <a href="/">Chapter COMING SOOn</a>
                                <a href="/">Chapter COMING SOOn</a>
                                <a href="/">Chapter COMING SOOn</a>
                            </div>
                        </div>
                    </div>
                ))
                }

            </div>
        </div>);
}

export default Home;