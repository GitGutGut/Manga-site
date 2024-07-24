import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { Link } from 'react-router-dom';
import { fetchMangaList } from '../api';

const Home = () => {
    const [mangaData, setMangaData] = useState([]);
    const [filter, setFilter] = useState('');
    const [mangaDataFiltered, setMangaDataFiltered] = useState([]);

    useEffect(() => {
        fetchMangaData();
    }, []);

    useEffect(() => {
        setMangaDataFiltered(
            mangaData.filter(manga => manga.name.toLowerCase().includes(filter.toLowerCase()))
        );
    }, [mangaData, filter]);

    function replaceString(originalString, replacementString) {
        // Split the text by obtaining the length of the replacementString,
        // after that obtain the starting prefix so it can be added by the replacement.
        const length = replacementString.length;
        const prefix = originalString.slice(0, originalString.length - length);
    
        // Combine the prefix, replacement string
        const modifiedString = prefix + replacementString;
    
        return modifiedString;
    }
    const fetchMangaData = async () => {
        try {
            const data = await fetchMangaList();
            setMangaData(data);
            setMangaDataFiltered(data);
        } catch (error) {
            console.error("Error fetching manga data:", error);
        }
    };

    const createPhotoURL = (name) => {
        const base = "http://localhost:8000/static/photos/"
        const jpg = ".jpg"
        return base + name + jpg
    }


    return (
        <div className="home">
            <Navbar filterFunc={setFilter} />

            <div className="mangaList">
                {mangaDataFiltered.length > 0 ? (
                    mangaDataFiltered.map(manga => (
                        <div className="Manga" key={manga.id}>
                            <Link to={`/manga/${manga.id}`}>
                                <img src={createPhotoURL(manga.name)} alt="Manga Cover" />
                            </Link>
                            <div className="MangaDetails">
                                <div className="MangaTitle">{manga.name}</div>
                                <div className="MangaChapter">
                                    {[0, 1, 2].map((item, key) => (
                                        manga.chapter_amount - item > 0 && (
                                            <Link key={key} to={`/manga/${manga.id}/${replaceString("c000", String(manga.chapter_amount - item))}/${manga.chapter_amount - item}`}>
                                                Chapter {manga.chapter_amount - item}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>{!mangaData.length ? "No published manga." : "Nothing found."}</h1>
                )}
            </div>
        </div>
    );
};

export default Home;
