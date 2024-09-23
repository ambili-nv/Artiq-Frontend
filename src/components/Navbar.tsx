// // Navbar.tsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import showToast from '../../utils/toaster';

// const Navbar: React.FC = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('access_token'); // Clear the token
//         navigate('/login'); // Redirect to login page
//         showToast('Successfully loged out',"success")
//     };

//     return (
//         <nav className="bg-gray-800 text-white">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//                 <div className="text-xl font-bold">
//                     <Link to="/">Artiq</Link>
//                 </div>
//                 <div className="hidden md:flex space-x-4">
//                     <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
//                         Dashboard
//                     </Link>
//                     <Link to="/create-article" className="hover:bg-gray-700 px-3 py-2 rounded">
//                         Create Article
//                     </Link>
//                     <Link to="/my-articles" className="hover:bg-gray-700 px-3 py-2 rounded">
//                         My Articles
//                     </Link>
//                     <Link to="/settings" className="hover:bg-gray-700 px-3 py-2 rounded">
//                         Settings
//                     </Link>
//                 </div>
//                 <div className="relative">
//                     <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded">
//                         Logout
//                     </button>
//                     <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md hidden group-hover:block">
//                     </div>
//                 </div>
//                 <div className="md:hidden">
//                     <button className="text-white focus:outline-none">
//                         {/* Hamburger Icon */}
//                         <svg
//                             className="w-6 h-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             {/* Mobile Menu */}
//             <div className="md:hidden">
//                 <div className="flex flex-col space-y-2">
//                     <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
//                         Dashboard
//                     </Link>
//                     <Link to="/create-article" className="block px-4 py-2 hover:bg-gray-700">
//                         Create Article
//                     </Link>
//                     <Link to="/my-articles" className="block px-4 py-2 hover:bg-gray-700">
//                         My Articles
//                     </Link>
//                     <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">
//                         Settings
//                     </Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import showToast from '../../utils/toaster';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token'); // Check for the token

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Clear the token
        navigate('/login'); // Redirect to login page
        showToast('Successfully logged out', "success");
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/">Artiq</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
                        Dashboard
                    </Link>
                    <Link to="/create-article" className="hover:bg-gray-700 px-3 py-2 rounded">
                        Create Article
                    </Link>
                    <Link to="/my-articles" className="hover:bg-gray-700 px-3 py-2 rounded">
                        My Articles
                    </Link>
                    <Link to="/user-profile" className="hover:bg-gray-700 px-3 py-2 rounded">
                        Settings
                    </Link>
                </div>
                <div className="relative">
                    {token ? ( // Only show Logout button if token exists
                        <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded">
                            Login
                        </Link>
                    )}
                </div>
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        {/* Hamburger Icon */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
                <div className="flex flex-col space-y-2">
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                        Dashboard
                    </Link>
                    <Link to="/create-article" className="block px-4 py-2 hover:bg-gray-700">
                        Create Article
                    </Link>
                    <Link to="/my-articles" className="block px-4 py-2 hover:bg-gray-700">
                        My Articles
                    </Link>
                    <Link to="/user-profile" className="block px-4 py-2 hover:bg-gray-700">
                        Settings
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
