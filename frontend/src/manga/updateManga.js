import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";
import { updateManga } from "../api"; 

const UpdateManga = () => {
    const { mangaId } = useParams();
    const [mangaUpdate, setMangaUpdate] = useState({
        chapter_amount: 0,
        episodes: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMangaUpdate({
            ...mangaUpdate,
            episodes: file
        });
    };

    const handleChange = (e) => {
        setMangaUpdate({
            ...mangaUpdate,
            [e.target.name]: e.target.value
        });
    };

    const sendUpdate = async () => {
        try {
            await updateManga(mangaId, mangaUpdate);
            console.log("Manga updated successfully!");
        } catch (error) {
            console.error("Error updating manga:", error);
        }
    };

    return (
        <div className="UpdateManga">
            <Navbar />
            <div className="Update">
                <div className="chapterAmount">
                    <label>Amount of chapters you will be adding:</label>
                    <input
                        type="number"
                        name="chapter_amount"
                        value={mangaUpdate.chapter_amount}
                        onChange={handleChange}
                    />
                </div>
                <div className="episodes">
                    <label>
                        Upload a zip file where it contains directories
                        numbered (C001, C002, ..., C999). In these directories
                        will be chapter photos which will be numbered (001,
                        002, ..., 999).
                    </label>
                    <input
                        type="file"
                        name="episodes"
                        accept=".zip"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <button className="UpdateMangaButton" onClick={sendUpdate}>
                Update Manga
            </button>
            <h1>Update manga</h1>
        </div>
    );
};

export default UpdateManga;
