import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';


// Define the Article type here
interface Article {
    _id: string;
    title: string;
    images: string;
    likes: { length: number }[];  // Adjust based on your actual data
    dislikes: { length: number }[];  // Adjust based on your actual data
}

const MyArticles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);  // Apply the Article type
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchArticles = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/articles/my-articles`);
    //             setArticles(response.data);
    //         } catch (error) {
    //             console.error('Error fetching articles', error);
    //         }
    //     };

    //     fetchArticles();
    // }, []);


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`${BASE_URL}/my-articles`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setArticles(response.data);
                console.log(response.data,"re data arti");
                
            } catch (error) {
                console.error('Error fetching articles', error);
            }
        };
    
        fetchArticles();
    }, []);
    

    const handleEdit = (id: string) => {
        navigate(`/edit-article/${id}`);
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //         await axios.delete(`${BASE_URL}/delete-articles/${id}`);
    //         setArticles(articles.filter(article => article._id !== id));
    //     } catch (error) {
    //         console.error('Error deleting article', error);
    //     }
    // };



    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`${BASE_URL}/delete-articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArticles(articles.filter(article => article._id !== id));
            showToast("Article deteted successfully","success")
        } catch (error) {
            console.error('Error deleting article', error);
            showToast("Failed to  deteted article","error")
        }
    };
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(article => (
                <div key={article._id} className="bg-white p-4 shadow-md rounded-lg">
                    <img src={article.images} alt={article.title} className="w-full h-48 object-cover" />
                    <h3 className="text-lg font-bold mt-2">{article.title}</h3>
                    <p>Likes: {article.likes.length}</p>
                    <p>Dislikes: {article.dislikes.length}</p>
                    <div className="mt-4">
                        <button onClick={() => handleEdit(article._id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Edit
                        </button>
                        <button onClick={() => handleDelete(article._id)} className="bg-red-500 text-white px-4 py-2 ml-2 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyArticles;
