// ArticleDetail.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import icons

// Define the Article interface
interface Article {
    title: string;
    description: string;
    images: string[];
    likes: string[]; // Assuming an array of user IDs
    dislikes: string[]; // Assuming an array of user IDs
}

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/article-details/${id}`);
                setArticle(response.data);
                setLikes(response.data.likes.length); // Set initial likes
                setDislikes(response.data.dislikes.length); // Set initial dislikes
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Get the token from localStorage
    
            const response = await axios.post(
                `${BASE_URL}/article/${id}/reaction`,
                { reaction: 'like' },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass the token in the Authorization header
                    }
                }
            );
            setLikes(response.data.likes); // Update likes count
            setDislikes(response.data.dislikes); // Update dislikes count if needed
        } catch (error) {
            console.error("Error liking article:", error);
        }
    };
    
    const handleDislike = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Get the token from localStorage
    
            const response = await axios.post(
                `${BASE_URL}/article/${id}/reaction`,
                { reaction: 'dislike' },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass the token in the Authorization header
                    }
                }
            );
            setLikes(response.data.likes); // Update likes count if needed
            setDislikes(response.data.dislikes); // Update dislikes count
        } catch (error) {
            console.error("Error disliking article:", error);
        }
    };
    

    if (!article) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
            <img src={article.images[0]} alt={article.title} className="w-full h-60 object-cover mb-4" />
            <div className="text-left" dangerouslySetInnerHTML={{ __html: article.description }} />
            
            <div className="flex items-center mt-4">
                <button onClick={handleLike} className="flex items-center mr-4">
                    <FaThumbsUp className="text-green-500" />
                    <span className="ml-1">{likes}</span>
                </button>
                <button onClick={handleDislike} className="flex items-center">
                    <FaThumbsDown className="text-red-500" />
                    <span className="ml-1">{dislikes}</span>
                </button>
            </div>
        </div>
    );
};

export default ArticleDetail;
