import React from 'react';

const MangaDetails = ({ mangaData }) => (
    <div className='MangaContent'>
        <img src={`http://localhost:8000/${mangaData?.photoPath}`}
            alt={mangaData?.name} className="MangaImage" />
        <div className='MangaDetails'>
            <h1>{mangaData?.name}</h1>
            <h2>Author: {mangaData?.author}</h2>
            <h2>Chapters: {mangaData?.chapterAmount}</h2>
            <div className='TagTemplate'>
                <h2>Tags: </h2>
                {mangaData?.tags.map((tag, index) => (
                    <button key={index} className='tagButton'>{tag}</button>
                ))}
            </div>
            <p><b>Description:</b> {mangaData?.description}</p>
        </div>
    </div>
);

export default MangaDetails;
