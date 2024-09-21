import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('Form Submitted', values);
      setSubmittedData(values);
    },
  });

  useEffect(() => {
    const loginUser = async () => {
      if (submittedData) {
        try {
          const response = await axios.post(`${BASE_URL}/login`, submittedData);
          console.log('Login Successful:///////////////////////', response.data);
          
            const access_token = response.data.token;
            localStorage.setItem('token', access_token);
          
          showToast(response.data.message, "success");
          // Handle successful login (e.g., redirect to dashboard)
        } catch (error) {
          console.error('Login Error:', error);
          showToast('Login failed, please check your credentials', 'error');
        }
      }
    };

    loginUser();
  }, [submittedData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Address */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="mt-1 text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
