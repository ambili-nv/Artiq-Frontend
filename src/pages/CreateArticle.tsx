import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for styling
import uploadImagesToCloudinary from '../.././src/API/uploadImages';
import { BASE_URL } from '../../constants';

const CreateArticle: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(files);
            
            // Generate image previews
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (imageFiles.length > 0) {
                const urls = await uploadImagesToCloudinary(imageFiles);
                //@ts-ignore
                setUploadedImageUrls(urls);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    useEffect(() => {
        if (uploadedImageUrls.length > 0) {
            const postArticleData = async () => {
                try {
                    const token = localStorage.getItem('access_token'); // Get the token from localStorage
                    await axios.post(
                        `${BASE_URL}/create-article`, 
                        {
                            title,
                            description,
                            images: uploadedImageUrls,
                            tags: tags.split(',').map(tag => tag.trim()),
                            category,
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    // Reset form after successful submission
                    setTitle('');
                    setDescription('');
                    setImageFiles([]);
                    setImagePreviews([]);
                    setTags('');
                    setCategory('');
                } catch (error) {
                    console.error("Failed to submit article:", error);
                }
            };

            postArticleData();
        }
    }, [uploadedImageUrls]);

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Article Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <ReactQuill 
                        value={description} 
                        onChange={setDescription} 
                        className="h-40" // Adjust height as needed
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload Image(s)
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        accept="image/*"
                        multiple
                    />
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image Preview(s):</label>
                        <div className="flex flex-wrap">
                            {imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Preview ${index}`} className="h-24 w-24 object-cover m-2 rounded" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="sports">Sports</option>
                        <option value="politics">Politics</option>
                        <option value="space">Space</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create Article
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import uploadImagesToCloudinary from '../.././src/API/uploadImages';
// import { BASE_URL } from '../../constants';

// const CreateArticle: React.FC = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [imageFiles, setImageFiles] = useState<File[]>([]);
//     const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//     const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
//     const [tags, setTags] = useState('');
//     const [category, setCategory] = useState('');

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             const files = Array.from(e.target.files);
//             setImageFiles(files);
            
//             // Generate image previews
//             const previews = files.map(file => URL.createObjectURL(file));
//             setImagePreviews(previews);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             if (imageFiles.length > 0) {
//                 const urls = await uploadImagesToCloudinary(imageFiles); // Upload images to Cloudinary
//                 //@ts-ignore
//                 setUploadedImageUrls(urls); // Store the uploaded image URLs
//             }
//         } catch (error) {
//             console.error("Image upload failed:", error);
//         }
//     };

//     // useEffect(() => {
//     //     if (uploadedImageUrls.length > 0) {
//     //         // API call to submit the article data after images are uploaded
//     //         const postArticleData = async () => {
//     //             try {
//     //                 await axios.post(`${BASE_URL}/create-article`, {
//     //                     title,
//     //                     description,
//     //                     images: uploadedImageUrls, // Sending uploaded image URLs
//     //                     tags: tags.split(',').map(tag => tag.trim()),
//     //                     category,
//     //                 });
//     //                 // Reset form after successful submission
//     //                 setTitle('');
//     //                 setDescription('');
//     //                 setImageFiles([]);
//     //                 setImagePreviews([]);
//     //                 setTags('');
//     //                 setCategory('');
//     //             } catch (error) {
//     //                 console.error("Failed to submit article:", error);
//     //             }
//     //         };

//     //         postArticleData();
//     //     }
//     // }, [uploadedImageUrls]); // Call API after images have been uploaded

  
//     useEffect(() => {
//         if (uploadedImageUrls.length > 0) {
//             const postArticleData = async () => {
//                 try {
//                     // Retrieve token from localStorage
//                     const token = localStorage.getItem('access_token'); // Assumes the token is stored under the key 'token'
//                     console.log(token,"toe");
                    
                    
//                     await axios.post(
//                         `${BASE_URL}/create-article`, 
//                         {
//                             title,
//                             description,
//                             images: uploadedImageUrls, // Sending uploaded image URLs
//                             tags: tags.split(',').map(tag => tag.trim()),
//                             category,
//                         },
//                         {
//                             headers: {
//                                 'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//                                 'Content-Type': 'application/json',
//                             },
//                         }
//                     );
                    
//                     // Reset form after successful submission
//                     setTitle('');
//                     setDescription('');
//                     setImageFiles([]);
//                     setImagePreviews([]);
//                     setTags('');
//                     setCategory('');
//                 } catch (error) {
//                     console.error("Failed to submit article:", error);
//                 }
//             };
    
//             postArticleData();
//         }
//     }, [uploadedImageUrls]);
    
    
  
  
//     return (
//         <div className="max-w-4xl mx-auto p-5">
//             <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                         Article Title
//                     </label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                         Description
//                     </label>
//                     <textarea
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         rows={5}
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                         Upload Image(s)
//                     </label>
//                     <input
//                         type="file"
//                         id="image"
//                         onChange={handleImageChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         accept="image/*"
//                         multiple
//                     />
//                 </div>

//                 {/* Image Previews */}
//                 {imagePreviews.length > 0 && (
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Image Preview(s):</label>
//                         <div className="flex flex-wrap">
//                             {imagePreviews.map((preview, index) => (
//                                 <img key={index} src={preview} alt={`Preview ${index}`} className="h-24 w-24 object-cover m-2 rounded" />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
//                         Tags (comma-separated)
//                     </label>
//                     <input
//                         type="text"
//                         id="tags"
//                         value={tags}
//                         onChange={(e) => setTags(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//                         Category
//                     </label>
//                     <select
//                         id="category"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     >
//                         <option value="">Select a category</option>
//                         <option value="sports">Sports</option>
//                         <option value="politics">Politics</option>
//                         <option value="space">Space</option>
//                     </select>
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         Create Article
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateArticle;
