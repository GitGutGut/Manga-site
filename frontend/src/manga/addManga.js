import React, { useState } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
import Tags from '../tags/tags';
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
    const [activeButton, setActiveButton] = useState({})

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
    const handleMangaAdd = async () => {
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

    const addTag = (name) => {
        setMangaInformation(prev => ({
            ...prev,
            tags: mangaInformation.tags.includes(name) ? (
                setActiveButton(
                    active => ({
                        ...active,
                        [name]: false
                    })),
                prev.tags.filter(t => t !== name)
            )
                : (setActiveButton(deactive => ({
                    ...deactive,
                    [name]: true
                })),
                    [...prev.tags, name])
        }));
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
                    {Object.entries(Tags)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([tag, name]) => (
                            <div key={tag} className='tag'>
                                <button type="button" className='tagButton' onClick={() => { addTag(name); }}
                                    style={{
                                        backgroundColor: activeButton[name] ? 'black' : 'grey'
                                    }}
                                >{name}</button>
                            </div>)
                        )}
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
                    <p>Upload a zip file where it contains directories numbered(C001,C002,...,C999) in these directories will be chapter photos which will be numbered to(001,002,...,999).</p>
                    <input type="file" name="episodes" accept=".zip" onChange={handleFileChange} />
                </div>
                <button type='submit' onClick={handleMangaAdd}>Save</button>
            </div>
        </div>
    );
}

export default AddManga;