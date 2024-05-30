import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";
import TextArea from "../customInt/TextArea.jsx";
import Button from "../customInt/Button.jsx";

const CreateComments = ({ itemId, collectionId,addClasses }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const ws = useRef(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://backforprojectreact-1.onrender.com/api/collections/${collectionId}/items/${itemId}`);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();

        // Установить соединение WebSocket
        ws.current = new WebSocket("ws://backforprojectreact.onrender.com");

        ws.current.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.error) {
                if(message.error==='Unauthorized'){
                    toast.error('Добавлять комментарии могут только авторизованные пользователи', { autoClose: 2500 });
                }
                console.error(message.error);
            } else if (message.success) {
                setComments(message.item.comments);
            }
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.current.close();
        };
    }, [collectionId, itemId]);

    const handleCommentSubmit = () => {
        if (newComment.trim() === "") return;

        const token = localStorage.getItem('token');
        const comment = {
            text: newComment,
            createdAt: new Date().toISOString()
        };

        ws.current.send(JSON.stringify({ collectionId, itemId, comment, token }));
        setNewComment("");
    };

    return (
        <div className="pb-5">
            <div className="ml-5">
                <TextArea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            </div>

            <Button additionalClasses="mb-5" onClick={handleCommentSubmit}>Add Comment</Button>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.user}</strong>: {comment.text} <em>({comment.createdAt})</em>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateComments;