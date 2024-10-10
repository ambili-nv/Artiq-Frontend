import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import uploadImagesToCloudinary from '../API/uploadImages';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';

const CreateArticle: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, aspect: 1 / 1 });
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

    // Error state
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');
    const [tagsError, setTagsError] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);

            // Generate image preview for cropping
            const preview = URL.createObjectURL(file);
            setImagePreview(preview);
            setImageError(''); // Clear error if an image is selected
        }
    };

    const handleImageLoaded = (image: HTMLImageElement) => {
        setImageRef(image);
    };

    const getCroppedImage = async () => {
        if (!completedCrop || !imageRef) {
            return null;
        }

        const canvas = document.createElement('canvas');
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = completedCrop.width!;
        canvas.height = completedCrop.height!;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                imageRef,
                completedCrop.x! * scaleX,
                completedCrop.y! * scaleY,
                completedCrop.width! * scaleX,
                completedCrop.height! * scaleY,
                0,
                0,
                completedCrop.width!,
                completedCrop.height!
            );
        }

        return new Promise<string | null>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                const croppedUrl = URL.createObjectURL(blob);
                resolve(croppedUrl);
            }, 'image/jpeg');
        });
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
        if (!imageFile) {
            setImageError('Image must be uploaded.');
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
            const croppedImage = await getCroppedImage();
            if (croppedImage && imageFile) {
                const blob = await fetch(croppedImage).then((res) => res.blob());
                const newFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
                const url = await uploadImagesToCloudinary([newFile]);
                //@ts-ignore
                setUploadedImageUrl(url[0]);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
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
                    showToast("Article created succesfully","success")
                    
                    // Reset form after successful submission
                    setTitle('');
                    setDescription('');
                    setImageFile(null);
                    setImagePreview(null);
                    setCroppedImageUrl(null);
                    setTags('');
                    setCategory('');
                } catch (error) {
                    showToast("Failed to submit article","error")
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
                    {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <ReactQuill 
                        value={description} 
                        onChange={setDescription} 
                        className="h-40"
                    />
                    {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        accept="image/*"
                    />
                    {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                </div>

                {imagePreview && (
                    <div className="mb-4">
                        <ReactCrop
                            src={imagePreview}
                            crop={crop}
                            onChange={(_: any, percentCrop: any) => setCrop(percentCrop)}
                            onComplete={(c: any) => setCompletedCrop(c)}
                            onImageLoaded={handleImageLoaded}
                        />
                        <p>Use the crop tool to adjust the image before uploading.</p>
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
                    {tagsError && <p className="text-red-500 text-sm">{tagsError}</p>}
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
                        <option value="">Select Category</option>
                        <option value="Tech">Tech</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Education">Education</option>
                        {/* Add more categories as needed */}
                    </select>
                    {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;




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
