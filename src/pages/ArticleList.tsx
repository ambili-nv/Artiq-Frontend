// // ArticleList.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../constants';
// import ArticleDetail from '../components/ArticleDetail';

// // Define the Article type
// interface Article {
//     _id: string;
//     title: string;
//     description: string;
//     images: string[];
//     // Add other fields as necessary
// }

// const ArticleList: React.FC = () => {
//     const [articles, setArticles] = useState<Article[]>([]);
//     const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

//     useEffect(() => {
//         const fetchArticles = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/articles`);
//                 setArticles(response.data);
//             } catch (error) {
//                 console.error("Error fetching articles:", error);
//             }
//         };

//         fetchArticles();
//     }, []);

//     const handleArticleClick = (article: Article) => {
//         setSelectedArticle(article);
//     };

//     const closeDetail = () => {
//         setSelectedArticle(null);
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-5">
//             <h2 className="text-2xl font-bold mb-4">Articles</h2>
//             {articles.length > 0 ? (
//                 <ul>
//                     {articles.map((article) => (
//                         <li key={article._id} className="mb-4 p-4 border rounded">
//                             <h3 className="text-xl font-semibold">{article.title}</h3>
//                             <img
//                                 src={article.images[0]}
//                                 alt={article.title}
//                                 className="h-48 w-full object-cover mt-2 rounded cursor-pointer"
//                                 onClick={() => handleArticleClick(article)}
//                             />
//                             <p className="text-gray-700">{article.description}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No articles found.</p>
//             )}

//             {/* Show Article Detail if selected */}
//             {selectedArticle && (
//                 <ArticleDetail article={selectedArticle} onClose={closeDetail} />
//             )}
//         </div>
//     );
// };

// export default ArticleList;



// ArticleList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';

interface Article {
    _id: string;
    title: string;
    images: string[];
}

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchArticles = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/articles`);
    //             setArticles(response.data);
    //         } catch (error) {
    //             console.error("Error fetching articles:", error);
    //         }
    //     };

    //     fetchArticles();
    // }, []);


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Retrieve the token from local storage or context
                const token = localStorage.getItem('access_token'); // Adjust this based on where you store your token
    
                const response = await axios.get(`${BASE_URL}/articles`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the Authorization header
                    },
                });
    
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
    
        fetchArticles();
    }, []);
    

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <div key={article._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={article.images[0]} alt={article.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{article.title}</h3>
                            <Link to={`article-details/${article._id}`} className="text-blue-500 hover:underline">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;


// // Dashboard.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { BASE_URL } from '../../constants';
// import { useAuth } from '../AuthContext';

// interface Article {
//     _id: string;
//     title: string;
//     images: string[];
//     categories: string[]; // Assuming articles have a categories field
// }

// const ArticleList: React.FC = () => {
//     const [articles, setArticles] = useState<Article[]>([]);
//     const { user } = useAuth(); // Get user info including preferences
//     console.log(user,"userauth /////");
    

//     useEffect(() => {
//         const fetchArticles = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/articles`);
//                 // Filter articles based on user preferences
//                 const filteredArticles = response.data.filter((article: Article) =>
//                     //@ts-ignore
//                     user.preferences.some((pref: string) => article.categories.includes(pref))
//                 );
//                 setArticles(filteredArticles);
//             } catch (error) {
//                 console.error("Error fetching articles:", error);
//             }
//         };

//         if (user && user.preferences.length) {
//             fetchArticles();
//         }
//     }, [user]);

//     return (
//         <div className="max-w-4xl mx-auto p-5">
//             <h2 className="text-2xl font-bold mb-4">Your Articles</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {articles.map((article) => (
//                     <div key={article._id} className="bg-white shadow-md rounded-lg overflow-hidden">
//                         <img src={article.images[0]} alt={article.title} className="w-full h-40 object-cover" />
//                         <div className="p-4">
//                             <h3 className="text-lg font-bold">{article.title}</h3>
//                             <Link to={`article-details/${article._id}`} className="text-blue-500 hover:underline">
//                                 Read More
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ArticleList;
