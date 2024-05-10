import React, { useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';

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
        e.preventDefault();
        console.log('Form submitted:', mangaInformation);

        await axios.post("http://localhost:8000/polls/manga-api/",
            mangaInformation, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log("Response: ", response);
        }).catch(error => {
            console.error(error);
        })
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
                    <input type="author"
                        name='author'
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
                <div className='photo'>
                    <label>Upload Photo:</label>
                    <input type="file"
                        name="photo"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileChange} />
                </div>
                <div className='episodes'>
                    <label>Upload Episodes:</label>
                    <p>Upload episodes in zip file where each episode mus be in folder and inside photos of the episode.</p>
                    <input type="file" name="episodes" accept=".zip" onChange={handleFileChange} />
                </div>
                <button type='submit' onClick={handleMangaAdd}>Save</button>
            </div>
        </div>
    );
}

export default AddManga;