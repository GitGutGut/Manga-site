import React, { useState, useEffect } from 'react';
import { fetchComments, uploadComment, deleteComment } from '../api';
import { useAuth } from './authContext';

const CommentSection = ({ mangaId }) => {
    const { authData } = useAuth();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        data: "",
        mangaid: mangaId,
        username: authData.username,
    });

    useEffect(() => {
        (async () => {
            const fetchedComments = await fetchComments(mangaId, authData.username);
            setComments(fetchedComments);
        })();
    }, [mangaId, authData.username]);

    const handleCommentChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };

    const handleCommentUpload = async () => {
        await uploadComment(comment);
        window.location.reload();
    };

    const handleCommentDelete = async (id) => {
        await deleteComment(id);
        window.location.reload();
    };

    return (
        <>
            <div className='CommentsTitle'>
                <h3>Nothing</h3>
            </div>
            <div className='Comments'>
                {comments.map((comment) => (
                    <div className="comment-item" key={comment.id}>
                        {authData.isAdministrator && (
                            <button className='deleteComment' onClick={() => handleCommentDelete(comment.id)}>X</button>
                        )}
                        <div className="comment-content">
                            <div className="comment-author">{comment.user}</div>
                            <div className="comment-date">{comment.date}</div>
                            <div className="comment-text">{comment.data}</div>
                        </div>
                    </div>
                ))}
            </div>
            {authData.isLoggedIn ? (
                <>
                    <input className='CommentData' name="data" onChange={handleCommentChange} />
                    <button className='AddComment' onClick={handleCommentUpload}>Add a Comment</button>
                </>
            ) : (
                <h1> You need to Login to add comment</h1>
            )}
        </>
    );
};

export default CommentSection;
