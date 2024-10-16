// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import uploadImagesToCloudinary from '../API/uploadImages';
// import { BASE_URL } from '../../constants';
// import showToast from '../../utils/toaster';


// const CreateArticle: React.FC = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
//     const [tags, setTags] = useState('');
//     const [category, setCategory] = useState('');

//     // Error state
//     const [titleError, setTitleError] = useState('');
//     const [descriptionError, setDescriptionError] = useState('');
//     const [imageError, setImageError] = useState('');
//     const [tagsError, setTagsError] = useState('');
//     const [categoryError, setCategoryError] = useState('');

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length > 0) {
//             const file = e.target.files[0];
//             setImageFile(file);

//             // Generate image preview
//             const preview = URL.createObjectURL(file);
//             setImagePreview(preview);
//             setImageError(''); // Clear error if an image is selected
//         }
//     };

//     const validateInputs = () => {
//         let isValid = true;

//         // Reset error messages
//         setTitleError('');
//         setDescriptionError('');
//         setImageError('');
//         setTagsError('');
//         setCategoryError('');

//         if (!title.trim()) {
//             setTitleError('Title cannot be empty.');
//             isValid = false;
//         }
//         if (!description.trim()) {
//             setDescriptionError('Description cannot be empty.');
//             isValid = false;
//         }
//         if (!imageFile) {
//             setImageError('Image must be uploaded.');
//             isValid = false;
//         }
//         if (!tags.trim()) {
//             setTagsError('Tags cannot be empty.');
//             isValid = false;
//         }
//         if (!category) {
//             setCategoryError('Category must be selected.');
//             isValid = false;
//         }

//         return isValid;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validateInputs()) {
//             return; // Exit if validation fails
//         }

//         try {
//             if (imageFile) {
//                 const url = await uploadImagesToCloudinary([imageFile]);
//                 //@ts-ignore
//                 setUploadedImageUrl(url[0]); // Assuming the upload function returns an array
//             }
//         } catch (error) {
//             console.error("Image upload failed:", error);
//         }
//     };

//     useEffect(() => {
//         if (uploadedImageUrl) {
//             const postArticleData = async () => {
//                 try {
//                     const token = localStorage.getItem('access_token');
//                     await axios.post(
//                         `${BASE_URL}/create-article`, 
//                         {
//                             title,
//                             description,
//                             images: [uploadedImageUrl],
//                             tags: tags.split(',').map(tag => tag.trim()),
//                             category,
//                         },
//                         {
//                             headers: {
//                                 'Authorization': `Bearer ${token}`,
//                                 'Content-Type': 'application/json',
//                             },
//                         }
//                     );
//                     showToast("Article created succesfully","success")

//                     // Reset form after successful submission
//                     setTitle('');
//                     setDescription('');
//                     setImageFile(null);
//                     setImagePreview(null);
//                     setTags('');
//                     setCategory('');
//                 } catch (error) {
//                     showToast("Failed to submit article","error")
//                     console.error("Failed to submit article:", error);
//                 }
//             };

//             postArticleData();
//         }
//     }, [uploadedImageUrl]);

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
//                     {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                     <ReactQuill 
//                         value={description} 
//                         onChange={setDescription} 
//                         className="h-40"
//                     />
//                     {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                         Upload Image
//                     </label>
//                     <input
//                         type="file"
//                         id="image"
//                         onChange={handleImageChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         accept="image/*"
//                     />
//                     {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
//                 </div>

//                 {imagePreview && (
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Image Preview:</label>
//                         <img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover m-2 rounded" />
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
//                     {tagsError && <p className="text-red-500 text-sm">{tagsError}</p>}
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
//                         <option value="space">Technology</option>
//                         <option value="space">Travel</option>
//                         <option value="space">Health</option>
//                     </select>
//                     {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}
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





import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // Import Cropper.js CSS
import uploadImagesToCloudinary from '../API/uploadImages';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';

const CreateArticle: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null); // String for displaying cropped image
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    // Error states
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');
    const [tagsError, setTagsError] = useState('');
    const [categoryError, setCategoryError] = useState('');

    // Ref for Cropper
    const cropperRef = useRef<Cropper | null>(null);  // Initialize as null

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);

            // Generate image preview
            const preview = URL.createObjectURL(file);
            setImagePreview(preview);
            setImageError(''); // Clear error if an image is selected
        }
    };

    const cropImage = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
                if (blob) {
                    // Convert Blob to object URL to show preview
                    const croppedPreview = URL.createObjectURL(blob);
                    setCroppedImage(croppedPreview); // Set the cropped image preview
                    setImagePreview(null); // Hide original preview after cropping
                } else {
                    console.error('Canvas is empty');
                    showToast("Failed to process image", "error");
                }
            }, 'image/jpeg');
        } else {
            console.error('Cropper instance not available or not properly initialized');
            showToast("Failed to process image", "error");
        }
    };

    const validateInputs = () => {
        let isValid = true;

        // Reset error messages
        setTitleError('');
        setDescriptionError('');
        setImageError('');
        setTagsError('');
        setCategoryError('');

        if (!title.trim()) {
            setTitleError('Title cannot be empty.');
            isValid = false;
        }
        if (!description.trim()) {
            setDescriptionError('Description cannot be empty.');
            isValid = false;
        }
        if (!imageFile && !croppedImage) {
            setImageError('Image must be uploaded and cropped.');
            isValid = false;
        }
        if (!tags.trim()) {
            setTagsError('Tags cannot be empty.');
            isValid = false;
        }
        if (!category) {
            setCategoryError('Category must be selected.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInputs()) {
            return; // Exit if validation fails
        }

        try {
            let imageToUpload: File | null = null;

            if (croppedImage) {
                // Convert cropped image (Blob) to File
                const response = await fetch(croppedImage);
                const blob = await response.blob();
                imageToUpload = new File([blob], imageFile?.name || 'croppedImage.jpg', {
                    type: 'image/jpeg',
                });
            } else if (imageFile) {
                imageToUpload = imageFile;
            }

            if (imageToUpload) {
                const url = await uploadImagesToCloudinary([imageToUpload]);
                //@ts-ignore
                setUploadedImageUrl(url[0]); // Assuming the upload function returns an array
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            showToast("Failed to upload image", "error");
        }
    };

    useEffect(() => {
        if (uploadedImageUrl) {
            const postArticleData = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    await axios.post(
                        `${BASE_URL}/create-article`,
                        {
                            title,
                            description,
                            images: [uploadedImageUrl],
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
                    showToast("Article created successfully", "success");

                    // Reset form after successful submission
                    setTitle('');
                    setDescription('');
                    setImageFile(null);
                    setImagePreview(null);
                    setCroppedImage(null);
                    setTags('');
                    setCategory('');
                } catch (error) {
                    showToast("Failed to submit article", "error");
                    console.error("Failed to submit article:", error);
                }
            };

            postArticleData();
        }
    }, [uploadedImageUrl]);

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Article Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Article Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${titleError ? 'border-red-500' : ''}`}
                        required
                    />
                    {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className="h-40"
                    />
                    {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                </div>

                {/* Upload Image */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${imageError ? 'border-red-500' : ''}`}
                        accept="image/*"
                    />
                    {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                </div>

                {/* Crop Image */}
                {imagePreview && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Crop Image:</label>
                        <Cropper
                            src={imagePreview}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio={1}
                            guides={false}
                            viewMode={1}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                cropperRef.current = instance as any;  // Casting to any to fix the readonly issue
                            }}
                            className="mb-2"
                        />
                        <button
                            type="button"
                            onClick={cropImage}
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Crop Image
                        </button>
                    </div>
                )}

                {/* Cropped Image Preview */}
                {croppedImage && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cropped Image Preview:</label>
                        <img
                            src={croppedImage}
                            alt="Cropped Preview"
                            className="w-64 h-64 object-cover"
                        />
                    </div>
                )}

                {/* Tags */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${tagsError ? 'border-red-500' : ''}`}
                        required
                    />
                    {tagsError && <p className="text-red-500 text-sm">{tagsError}</p>}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${categoryError ? 'border-red-500' : ''}`}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="tech">Tech</option>
                        <option value="life">Life</option>
                        <option value="science">Science</option>
                    </select>
                    {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Article
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;
