// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../constants';
// import showToast from '../../utils/toaster';

// const UserProfile: React.FC = () => {
//     const [user, setUser] = useState({
//         name: '',
//         email: '',
//         phoneNumber: '',
//     });

//     const [editMode, setEditMode] = useState(false);
//     const [name, setName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');

//     const [passwordData, setPasswordData] = useState({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//     });

//     const [passwordError, setPasswordError] = useState('');
//     const [showChangePassword, setShowChangePassword] = useState(false);
//     const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem('access_token');
//                 const response = await axios.get(`${BASE_URL}/user-profile`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setUser(response.data);
//                 setName(response.data.name);
//                 setPhoneNumber(response.data.phoneNumber);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleSave = async () => {
//         try {
//             const token = localStorage.getItem('access_token');
//             await axios.put(`${BASE_URL}/update-profile`, { name, phoneNumber }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setUser({ ...user, name, phoneNumber });
//             showToast("Profile updates successfully","success")
//             setEditMode(false);
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             showToast("Error in updating profile","error")
//         }
//     };

//     const handlePasswordChange = async () => {
//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             setPasswordError('New password and confirm password do not match.');
//             return;
//         }

//         try {
//             const token = localStorage.getItem('access_token');
//             await axios.post(`${BASE_URL}/change-password`, { newPassword: passwordData.newPassword }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             showToast('Password updated successfully',"success");
//             setShowChangePassword(false);
//             // Reset password data
//             setPasswordData({
//                 currentPassword: '',
//                 newPassword: '',
//                 confirmPassword: '',
//             });
//             setIsCurrentPasswordValid(false);
//         } catch (error) {
//             console.error('Error changing password:', error);
//             showToast('Error changing password:',"error");
//         }
//     };

//     const verifyCurrentPassword = async () => {
//         try {
//             const token = localStorage.getItem('access_token');
//             const response = await axios.post(`${BASE_URL}/verify-password`, { password: passwordData.currentPassword }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (response.data.valid) {
//                 setIsCurrentPasswordValid(true);
//                 setPasswordError('');
//             } else {
//                 setIsCurrentPasswordValid(false);
//                 setPasswordError('Current password is incorrect.');
//             }
//         } catch (error) {
//             console.error('Error verifying password:', error);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 space-y-6">
//             <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
            
//             {/* User Information Card */}
//             <div className="p-6 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     {/* Name */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Name</label>
//                         {editMode ? (
//                             <input
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                             />
//                         ) : (
//                             <p className="mt-1">{user.name}</p>
//                         )}
//                     </div>

//                     {/* Email (not editable) */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <p className="mt-1">{user.email}</p>
//                     </div>

//                     {/* Phone Number */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                         {editMode ? (
//                             <input
//                                 type="text"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                             />
//                         ) : (
//                             <p className="mt-1">{user.phoneNumber}</p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Edit/Save Button */}
//                 <div className="mt-4">
//                     {editMode ? (
//                         <button
//                             onClick={handleSave}
//                             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                         >
//                             Save
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() => setEditMode(true)}
//                             className="bg-gray-500 text-white px-4 py-2 rounded-md"
//                         >
//                             Edit
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Change Password Card */}
//             <div className="p-6 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold mb-4">Change Password</h3>
//                 {showChangePassword ? (
//                     <div>
//                         {!isCurrentPasswordValid && (
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Current Password</label>
//                                 <input
//                                     type="password"
//                                     value={passwordData.currentPassword}
//                                     onChange={(e) =>
//                                         setPasswordData({ ...passwordData, currentPassword: e.target.value })
//                                     }
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                 />
//                                 <button
//                                     onClick={verifyCurrentPassword}
//                                     className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
//                                 >
//                                     Verify
//                                 </button>
//                             </div>
//                         )}

//                         {isCurrentPasswordValid && (
//                             <>
//                                 <div className="mt-4">
//                                     <label className="block text-sm font-medium text-gray-700">New Password</label>
//                                     <input
//                                         type="password"
//                                         value={passwordData.newPassword}
//                                         onChange={(e) =>
//                                             setPasswordData({ ...passwordData, newPassword: e.target.value })
//                                         }
//                                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                     />
//                                 </div>
//                                 <div className="mt-4">
//                                     <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                                     <input
//                                         type="password"
//                                         value={passwordData.confirmPassword}
//                                         onChange={(e) =>
//                                             setPasswordData({ ...passwordData, confirmPassword: e.target.value })
//                                         }
//                                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}

//                         <div className="mt-4 flex justify-end">
//                             {isCurrentPasswordValid && (
//                                 <button
//                                     onClick={handlePasswordChange}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                                 >
//                                     Change Password
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex justify-end">
//                         <button
//                             onClick={() => setShowChangePassword(true)}
//                             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                         >
//                             Change Password
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import showToast from '../../utils/toaster';

const UserProfile: React.FC = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`${BASE_URL}/user-profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setName(response.data.name);
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const validateName = (name: string) => {
        if (!name) {
            setNameError('Name cannot be empty.');
            return false;
        }
        if (!/^[A-Z]/.test(name)) {
            setNameError('Name must start with a capital letter.');
            return false;
        }
        setNameError('');
        return true;
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) {
            setPhoneError('Phone number cannot be empty.');
            return false;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneError('Phone number must be 10 digits.');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handleSave = async () => {
        const isNameValid = validateName(name);
        const isPhoneValid = validatePhoneNumber(phoneNumber);

        if (!isNameValid || !isPhoneValid) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`${BASE_URL}/update-profile`, { name, phoneNumber }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser({ ...user, name, phoneNumber });
            showToast("Profile updated successfully", "success");
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            showToast("Error updating profile", "error");
        }
    };

    const handlePasswordChange = async () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }
        if (!passwordPattern.test(passwordData.newPassword)) {
            setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            await axios.post(`${BASE_URL}/change-password`, { newPassword: passwordData.newPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showToast('Password updated successfully', "success");
            setShowChangePassword(false);
            // Reset password data
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setIsCurrentPasswordValid(false);
            setPasswordError(''); // Clear any password error messages
        } catch (error) {
            console.error('Error changing password:', error);
            showToast('Error changing password:', "error");
        }
    };

    const verifyCurrentPassword = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post(`${BASE_URL}/verify-password`, { password: passwordData.currentPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.valid) {
                setIsCurrentPasswordValid(true);
                setPasswordError('');
            } else {
                setIsCurrentPasswordValid(false);
                setPasswordError('Current password is incorrect.');
            }
        } catch (error) {
            console.error('Error verifying password:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
            
            {/* User Information Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        {editMode ? (
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        validateName(e.target.value);
                                    }}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                            </div>
                        ) : (
                            <p className="mt-1">{user.name}</p>
                        )}
                    </div>

                    {/* Email (not editable) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1">{user.email}</p>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        {editMode ? (
                            <div>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        validatePhoneNumber(e.target.value);
                                    }}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                            </div>
                        ) : (
                            <p className="mt-1">{user.phoneNumber}</p>
                        )}
                    </div>
                </div>

                {/* Edit/Save Button */}
                <div className="mt-4">
                    {editMode ? (
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Change Password Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                {showChangePassword ? (
                    <div>
                        {!isCurrentPasswordValid && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) =>
                                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                    }
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <button
                                    onClick={verifyCurrentPassword}
                                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Verify
                                </button>
                            </div>
                        )}

                        {isCurrentPasswordValid && (
                            <>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                                        }
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                                        }
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </>
                        )}

                        {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}

                        <div className="mt-4 flex justify-end">
                            {isCurrentPasswordValid && (
                                <button
                                    onClick={handlePasswordChange}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Change Password
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowChangePassword(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Change Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
