import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";

const UpdateManga = () => {
    const { mangaId } = useParams();
    const [mangaUpdate, setMangaUpdate] = useState({
        chapter_amount: 0,
        episodes: null,
        mangaId: mangaId
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setMangaUpdate({
            ...mangaUpdate,
            [e.target.name]: file,
        });
    }

    const handleChange = (e) => {
        setMangaUpdate({
            ...mangaUpdate,
            [e.target.name]: e.target.value,
        });
    }
    const sendUpdate = async () => {
        axios.patch("http://localhost:8000/polls/manga-api/", mangaUpdate, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.error(error)
            });
    }
    return (
        <div className="UpdateManga">
            <Navbar />
            <div className="Update">
                <div className="chapterAmount">
                    <label>Amount of chapters you will be adding:</label>
                    <input type="Chapter amount" name="chapter_amount" onChange={handleChange} />
                </div>
                <div className="episodes">
                    <label>Upload a zip file where it contains directories numbered(C001,C002,...,C999) in these directories will be chapter photos which will be numbered to(001,002,...,999).</label>
                    <input type="file" name="episodes" accept=".zip" onChange={handleFileChange} />
                </div>

            </div>
            <button className="UpdateMangaButton" onClick={sendUpdate}>Update Manga</button>
            <h1>Update manga</h1>
        </div>
    );
}

export default UpdateManga;