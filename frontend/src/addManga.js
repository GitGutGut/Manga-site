import React, { useState } from 'react';
import Navbar from './navbar';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './authContext';

const AddManga = () => {
    const [mangaInformation, setMangaInformation] = useState({
        photo: null,
        episodes: null,
        tags: [],
        name: "",
        author: "",
        description: "",
        chapter_amount: 0,
    });

    const handleChange = (e) => {

        if (e.target.name === "chapter_amount" && /^[1-9]\d*$/.test(e.target.value)) {
            setMangaInformation({
                ...mangaInformation,
                [e.target.name]: parseInt(e.target.value)
            });
        } else {
            setMangaInformation({
                ...mangaInformation,
                [e.target.name]: e.target.value
            });
        }

    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setMangaInformation({
            ...mangaInformation,
            [e.target.name]: file,
        });
    }
    const handleMangaAdd = async (e) => {
        //TODO: BACKEND SEND DATA
        console.log(mangaInformation)
    }

    return (

        <div className='addManga'>
            <Navbar />
            <div className='mainContent'>

                <div className='mangaName'>
                    <label>Name:</label>
                    <input type="name"
                        name='name'
                        onChange={handleChange} />
                </div>
                <div className='authorName'>
                    <label>Author name:</label>
                    <input type="authorName"
                        name='authorName'
                        onChange={handleChange} />
                </div>
                <form>
                    <div className='Description'>
                        <label>Description:</label>
                        <textarea type="description"
                            name='description'
                            placeholder='Enter description'
                            onChange={handleChange} />
                    </div>
                </form>
                <div className='tags'>
                    tags bude treba dokoncit
                </div>
                <div className='chapterAmount'>
                    <label>Chapter amount (only positive numbers):</label>
                    <input type="chapter_amount"
                        name="chapter_amount"
                        onChange={handleChange} />
                </div>
                <div className='episodes'>
                    <label>Upload Photo:</label>
                    <input type="file"
                        name="photo"
                        accept=".png, .jpg, .jpeg"
                        onClick={handleFileChange} />
                </div>
                <div className='photoUpload'>
                    <label>Upload Episodes:</label>
                    <p>Upload episodes in zip file where there will for each episode folder with the number and inside photos of the episode.</p>
                    <input type="file" name="episodes" accept=".zip" onClick={handleFileChange} />
                </div>
                <button type='submit' onClick={handleMangaAdd}>Save</button>
            </div>
        </div>
    );
}

export default AddManga;