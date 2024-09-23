// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import uploadImagesToCloudinary from '../API/uploadImages';
// import { BASE_URL } from '../../constants';

// const EditArticle: React.FC = () => {
//     const { id } = useParams();
//     const [article, setArticle] = useState<{ title: string; description: string; images: string; }>({
//         title: '',
//         description: '',
//         images: ''
//     });
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchArticle = async () => {
//             try {
//                 const token = localStorage.getItem('access_token');
//                 const response = await axios.get(`${BASE_URL}/article/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setArticle(response.data);
//                 setImagePreview(response.data.images); // Set the initial image preview
//             } catch (error) {
//                 console.error('Error fetching article', error);
//             }
//         };

//         fetchArticle();
//     }, [id]);

//     const handleDescriptionChange = (value: string) => {
//         setArticle((prev) => ({ ...prev, description: value }));
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setImageFile(file);
//             const preview = URL.createObjectURL(file);
//             setImagePreview(preview); // Update the preview with the selected image
//         } else {
//             setImageFile(null);
//             setImagePreview(article.images); // Reset to original image if no file selected
//         }
//     };

//     // const handleSubmit = async () => {
//     //     try {
//     //         let imageUrl = article.images;

//     //         if (imageFile) {
//     //             const uploadedImageUrls = await uploadImagesToCloudinary([imageFile]);
//     //             // @ts-ignore
//     //             imageUrl = uploadedImageUrls[0];
//     //         }

//     //         const token = localStorage.getItem('access_token');

//     //         await axios.put(`${BASE_URL}/edit-articles/${id}`, {
//     //             title: article.title,
//     //             description: article.description,
//     //             imageUrl,
//     //         }, {
//     //             headers: {
//     //                 Authorization: `Bearer ${token}`
//     //             }
//     //         });

//     //         alert('Article updated successfully');
//     //     } catch (error) {
//     //         console.error('Error updating article', error);
//     //         alert('Failed to update the article');
//     //     }
//     // };


//     const handleSubmit = async () => {
//         try {
//             let imageUrl = article.images; // Default to existing image URL
    
//             if (imageFile) {
//                 // If there's a new image, upload it and get the new URL
//                 const uploadedImageUrls = await uploadImagesToCloudinary([imageFile]);
//                 // @ts-ignore
//                 imageUrl = uploadedImageUrls[0]; // Get the URL of the uploaded image
//                 console.log("Uploaded image URL:", imageUrl);
//             }
    
//             const token = localStorage.getItem('access_token');
    
//             const response = await axios.put(`${BASE_URL}/edit-articles/${id}`, {
//                 title: article.title,
//                 description: article.description,
//                 images: imageUrl, // Make sure this key matches what your backend expects
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json', // Ensure correct content type
//                 }
//             });
    
//             // Check the response status or data if necessary
//             if (response.status === 200) {
//                 alert('Article updated successfully');
//             }
//         } catch (error) {
//             console.error('Error updating article', error);
//             alert('Failed to update the article');
//         }
//     };
    


//     return (
//         <div className="max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
//             <div>
//                 <label className="block text-gray-700 mb-2">Title</label>
//                 <input
//                     type="text"
//                     value={article.title}
//                     onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
//                     className="w-full p-2 border rounded"
//                 />
//             </div>
//             <div className="mt-4">
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <ReactQuill value={article.description} onChange={handleDescriptionChange} />
//             </div>
//             <div className="mt-4">
//                 <label className="block text-gray-700 mb-2">Image</label>
//                 <input type="file" accept="image/*" onChange={handleImageChange} />
//                 {imagePreview && <img src={imagePreview} alt="Article" className="w-64 mt-2" />}
//             </div>
//             <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//                 Save Changes
//             </button>
//         </div>
//     );
// };

// export default EditArticle;






// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import uploadImagesToCloudinary from '../API/uploadImages';
// import { BASE_URL } from '../../constants';

// const EditArticle: React.FC = () => {
//     const { id } = useParams();
//     const [article, setArticle] = useState<{ title: string; description: string; images: string; }>({
//         title: '',
//         description: '',
//         images: ''
//     });
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);

//     // Error states
//     const [titleError, setTitleError] = useState('');
//     const [descriptionError, setDescriptionError] = useState('');
//     const [imageError, setImageError] = useState('');

//     useEffect(() => {
//         const fetchArticle = async () => {
//             try {
//                 const token = localStorage.getItem('access_token');
//                 const response = await axios.get(`${BASE_URL}/article/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setArticle(response.data);
//                 setImagePreview(response.data.images); // Set the initial image preview
//             } catch (error) {
//                 console.error('Error fetching article', error);
//             }
//         };

//         fetchArticle();
//     }, [id]);

//     const handleDescriptionChange = (value: string) => {
//         setArticle((prev) => ({ ...prev, description: value }));
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setImageFile(file);
//             const preview = URL.createObjectURL(file);
//             setImagePreview(preview); // Update the preview with the selected image
//             setImageError(''); // Clear image error if a file is selected
//         } else {
//             setImageFile(null);
//             setImagePreview(article.images); // Reset to original image if no file selected
//         }
//     };

//     const validateInputs = () => {
//         let isValid = true;

//         // Reset error messages
//         setTitleError('');
//         setDescriptionError('');
//         setImageError('');

//         if (!article.title.trim()) {
//             setTitleError('Title cannot be empty.');
//             isValid = false;
//         }
//         if (!article.description.trim()) {
//             setDescriptionError('Description cannot be empty.');
//             isValid = false;
//         }
//         if (!imageFile && !article.images) {
//             setImageError('An image must be uploaded or the existing one retained.');
//             isValid = false;
//         }

//         return isValid;
//     };

//     const handleSubmit = async () => {
//         if (!validateInputs()) {
//             return; // Exit if validation fails
//         }

//         try {
//             let imageUrl = article.images; // Default to existing image URL

//             if (imageFile) {
//                 // If there's a new image, upload it and get the new URL
//                 const uploadedImageUrls = await uploadImagesToCloudinary([imageFile]);
//                 // @ts-ignore
//                 imageUrl = uploadedImageUrls[0]; // Get the URL of the uploaded image
//                 console.log("Uploaded image URL:", imageUrl);
//             }

//             const token = localStorage.getItem('access_token');

//             const response = await axios.put(`${BASE_URL}/edit-articles/${id}`, {
//                 title: article.title,
//                 description: article.description,
//                 images: imageUrl,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });

//             if (response.status === 200) {
//                 alert('Article updated successfully');
//             }
//         } catch (error) {
//             console.error('Error updating article', error);
//             alert('Failed to update the article');
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
//             <div>
//                 <label className="block text-gray-700 mb-2">Title</label>
//                 <input
//                     type="text"
//                     value={article.title}
//                     onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
//                     className="w-full p-2 border rounded"
//                 />
//                 {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
//             </div>
//             <div className="mt-4">
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <ReactQuill value={article.description} onChange={handleDescriptionChange} />
//                 {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
//             </div>
//             <div className="mt-4">
//                 <label className="block text-gray-700 mb-2">Image</label>
//                 <input type="file" accept="image/*" onChange={handleImageChange} />
//                 {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
//                 {imagePreview && <img src={imagePreview} alt="Article" className="w-64 mt-2" />}
//             </div>
//             <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//                 Save Changes
//             </button>
//         </div>
//     );
// };

// export default EditArticle;




import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadImagesToCloudinary from '../API/uploadImages';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';

const EditArticle: React.FC = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<{ title: string; description: string; images: string; tags: string; }>({
        title: '',
        description: '',
        images: '',
        tags: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Error states
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');
    const [tagsError, setTagsError] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`${BASE_URL}/article/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setArticle(response.data);
                setImagePreview(response.data.images); // Set the initial image preview
            } catch (error) {
                console.error('Error fetching article', error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleDescriptionChange = (value: string) => {
        setArticle((prev) => ({ ...prev, description: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const preview = URL.createObjectURL(file);
            setImagePreview(preview); // Update the preview with the selected image
            setImageError(''); // Clear image error if a file is selected
        } else {
            setImageFile(null);
            setImagePreview(article.images); // Reset to original image if no file selected
        }
    };

    const validateInputs = () => {
        let isValid = true;

        // Reset error messages
        setTitleError('');
        setDescriptionError('');
        setImageError('');
        setTagsError('');

        if (!article.title.trim()) {
            setTitleError('Title cannot be empty.');
            isValid = false;
        }
        if (!article.description.trim()) {
            setDescriptionError('Description cannot be empty.');
            isValid = false;
        }
        if (!imageFile && !article.images) {
            setImageError('An image must be uploaded or the existing one retained.');
            isValid = false;
        }
        // if (!article.tags.trim()) {
        //     setTagsError('Tags cannot be empty.');
        //     isValid = false;
        // }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) {
            return; // Exit if validation fails
        }

        try {
            let imageUrl = article.images; // Default to existing image URL

            if (imageFile) {
                // If there's a new image, upload it and get the new URL
                const uploadedImageUrls = await uploadImagesToCloudinary([imageFile]);
                // @ts-ignore
                imageUrl = uploadedImageUrls[0]; // Get the URL of the uploaded image
                console.log("Uploaded image URL:", imageUrl);
            }

            const token = localStorage.getItem('access_token');

            const tagsArray = Array.isArray(article.tags) 
    ? article.tags // If it's already an array, use it as is
    : article.tags.split(',').map(tag => tag.trim()); //

            const response = await axios.put(`${BASE_URL}/edit-articles/${id}`, {
                title: article.title,
                description: article.description,
                images: imageUrl,
                // tags: article.tags.split(',').map(tag => tag.trim()), // Ensure tags are an array
                tags: tagsArray,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                showToast('Article updated successfully',"success");
            }
        } catch (error) {
            console.error('Error updating article', error);
            showToast('Failed to update the article',"error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
            <div>
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={article.title}
                    onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border rounded"
                />
                {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <ReactQuill value={article.description} onChange={handleDescriptionChange} />
                {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                {imagePreview && <img src={imagePreview} alt="Article" className="w-64 mt-2" />}
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                    type="text"
                    value={article.tags}
                    onChange={(e) => setArticle((prev) => ({ ...prev, tags: e.target.value }))}
                    className="w-full p-2 border rounded"
                />
                {tagsError && <p className="text-red-500 text-sm">{tagsError}</p>}
            </div>
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Save Changes
            </button>
        </div>
    );
};

export default EditArticle;
