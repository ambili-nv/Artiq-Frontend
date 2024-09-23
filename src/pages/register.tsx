// import React, { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import { validateSignUp } from '../../utils/validations';
// import axios from 'axios';
// import { BASE_URL } from '../../constants';
// import showToast from '../../utils/toaster';
// import { Link,useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

// const Register: React.FC = () => {
//   const [submittedData, setSubmittedData] = useState<any | null>(null);
//   const navigate = useNavigate();


//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       phoneNumber: '',
//       email: '',
//       dob: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validate: validateSignUp,
//     onSubmit: (values) => {
//       console.log('Form Submitted', values);
//       setSubmittedData(values);
//     },
//   });

//   useEffect(() => {
//     const registerUser = async () => {
//       if (submittedData) {
//         try {
//           const response = await axios.post(`${BASE_URL}/register`, submittedData);
//           console.log('Registration Successful:', response.data);
//           showToast(response.data.message, "success");
//           navigate('/login');
//         } catch (error) {
//           console.error('Registration Error:', error);
//           showToast('Already registered, please login', 'error');
//         }
//       }
//     };

//     registerUser();
//   }, [submittedData]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 ">
//       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8 m-12">
//         <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
//         <form onSubmit={formik.handleSubmit} className="space-y-5">
//           {/* First Name */}
//           <div>
//             <label className="block text-gray-700 mb-1" htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
//                 formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...formik.getFieldProps('name')}
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="mt-1 text-red-500 text-sm">{formik.errors.name}</div>
//             )}
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
//                 formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...formik.getFieldProps('phoneNumber')}
//             />
//             {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//               <div className="mt-1 text-red-500 text-sm">{formik.errors.phoneNumber}</div>
//             )}
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label className="block text-gray-700 mb-1" htmlFor="dob">Date of Birth</label>
//             <input
//               type="date"
//               id="dob"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
//                 formik.touched.dob && formik.errors.dob ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...formik.getFieldProps('dob')}
//             />
//             {formik.touched.dob && formik.errors.dob && (
//               <div className="mt-1 text-red-500 text-sm">{formik.errors.dob}</div>
//             )}
//           </div>

//           {/* Email Address */}
//           <div>
//             <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
//                 formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...formik.getFieldProps('email')}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="mt-1 text-red-500 text-sm">{formik.errors.email}</div>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
//                 formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...formik.getFieldProps('password')}
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="mt-1 text-red-500 text-sm">{formik.errors.password}</div>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
//                 formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...formik.getFieldProps('confirmPassword')}
//             />
//             {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//               <div className="mt-1 text-red-500 text-sm">{formik.errors.confirmPassword}</div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-gray-700  text-white font-semibold rounded-md shadow-md hover:bg-grey-900 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 transition duration-200"
//           >
//             Register
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;





// Register.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { validateSignUp } from '../../utils/validations';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [submittedData, setSubmittedData] = useState<any | null>(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            email: '',
            dob: '',
            password: '',
            confirmPassword: '',
            preferences: [], // New preferences field
        },
        validate: validateSignUp,
        onSubmit: (values) => {
            console.log('Form Submitted', values);
            setSubmittedData(values);
        },
    });

    useEffect(() => {
        const registerUser = async () => {
            if (submittedData) {
                try {
                    const response = await axios.post(`${BASE_URL}/register`, submittedData);
                    console.log('Registration Successful:', response.data);
                    showToast(response.data.message, "success");
                    navigate('/login');
                } catch (error) {
                    console.error('Registration Error:', error);
                    showToast('Already registered, please login', 'error');
                }
            }
        };

        registerUser();
    }, [submittedData]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8 m-12">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('phoneNumber')}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${formik.touched.dob && formik.errors.dob ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('dob')}
                        />
                        {formik.touched.dob && formik.errors.dob && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.dob}</div>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        )}
                    </div>

                    {/* Article Preferences */}
                    {/* Article Preferences */}
                    <div>
                        <label className="block text-gray-700 mb-1">Article Preferences</label>
                        <div className="flex flex-wrap">
                            {['Technology', 'Health', 'Travel', 'Sports', 'Politics', 'Space'].map((preference) => (
                                <div key={preference} className="mr-4">
                                    <input
                                        type="checkbox"
                                        id={preference}
                                        value={preference}
                                        onChange={(e) => {
                                            const values = formik.values.preferences;
                                            if (e.target.checked) {
                                                formik.setFieldValue('preferences', [...values, preference]);
                                            } else {
                                                formik.setFieldValue('preferences', values.filter((item) => item !== preference));
                                            }
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor={preference} className="text-gray-600">{preference}</label>
                                </div>
                            ))}
                        </div>
                        {/* Display validation error */}
                        {formik.touched.preferences && formik.errors.preferences && (
                            <div className="mt-1 text-red-500 text-sm">{formik.errors.preferences}</div>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-grey-900 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
