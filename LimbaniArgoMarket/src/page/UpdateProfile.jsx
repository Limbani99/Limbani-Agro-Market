import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataProvider';
import UpdatePasswordModal from '../components/UpdatePasswordModal';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { userData, login } = useData();
    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        skills: '',
        profileimg: '',
        coverimg: ''
    });

    useEffect(() => {
        // Load initial data from context or localStorage
        const user = userData || JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: typeof user.address === 'string' ? user.address : [user.address?.street, user.address?.city, user.address?.state].filter(Boolean).join(', ') || '',
                description: user.description || '',
                skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''),
                profileimg: user.profileimg || user.profilePicture || user.profile || '',
                coverimg: user.coverimg || user.coverPicture || ''
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Client-side compressed profile image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
                setFormData(prev => ({ ...prev, profileimg: compressedBase64 }));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    // Client-side compressed cover banner image upload
    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
                setFormData(prev => ({ ...prev, coverimg: compressedBase64 }));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setErrorMsg('');

        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = storedUser._id || storedUser.id || userData?._id || userData?.id;

            if (!userId) {
                setErrorMsg('User ID not found. Please log in again.');
                setLoading(false);
                return;
            }

            const payload = {
                id: userId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                description: formData.description,
                skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
                profileimg: formData.profileimg,
                coverimg: formData.coverimg
            };

            const res = await axios.put(`${API_URL}/api/user/update-profile`, payload);
            const updatedUser = {
                ...(res.data || {}),
                coverimg: formData.coverimg || res.data?.coverimg
            };

            // Preserve existing auth token and update local state
            const currentToken = localStorage.getItem('token') || '';
            login(updatedUser, currentToken);

            setMessage('Profile updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (err) {
            console.error('Update profile error:', err);
            setErrorMsg(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full pt-[76px] pb-16 sm:pb-20 min-h-screen bg-background">

            {/* Breadcrumb Navigation */}
            <div className="bg-surface border-b border-outline-variant/20 py-2.5 sm:py-3.5 mb-4 sm:mb-6 md:mb-8">
                <div className="max-w-container-max mx-auto px-3 sm:px-margin-mobile md:px-margin-desktop">
                    <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold">Edit Profile</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-3 sm:px-margin-mobile md:px-margin-desktop">

                {/* Header Action Bar */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-5 bg-surface-container-lowest rounded-xl sm:rounded-3xl border border-outline-variant/30 card-shadow">
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-lg sm:text-2xl">manage_accounts</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <h1 className="font-display-md text-sm sm:text-xl font-extrabold text-on-surface truncate">Update Profile Settings</h1>
                                <Link
                                    to="/profile"
                                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 rounded-md sm:rounded-xl text-[10px] sm:text-xs font-bold text-on-surface transition-all shrink-0 flex items-center gap-1 active:scale-95 shadow-sm whitespace-nowrap"
                                >
                                    <span className="material-symbols-outlined text-[10px] sm:text-[12px]">arrow_back</span>
                                    <span>Go Back</span>
                                </Link>
                            </div>
                            <p className="text-[10px] sm:text-xs text-on-surface-variant truncate mt-0.5">Manage your personal information, profile photos, and account security</p>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm flex items-center gap-2.5 shadow-sm">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        {message}
                    </div>
                )}

                {errorMsg && (
                    <div className="mb-6 p-4 rounded-2xl bg-error/10 border border-error/20 text-error font-bold text-sm flex items-center gap-2.5 shadow-sm">
                        <span className="material-symbols-outlined text-xl">error</span>
                        {errorMsg}
                    </div>
                )}

                {/* Laptop & Computer Dual Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* Left Column: Live Preview & Account Quick Card (Laptop/Desktop Sidebar) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Live Profile Card */}
                        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden">
                            {/* Banner Image */}
                            <div className="relative h-32 sm:h-36 bg-surface-container overflow-hidden">
                                {formData.coverimg ? (
                                    <img src={formData.coverimg} alt="Banner" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-primary/80 via-primary to-primary/90 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-3xl opacity-80">wallpaper</span>
                                    </div>
                                )}
                            </div>

                            {/* Avatar & User Details */}
                            <div className="px-6 pb-6 pt-0 relative text-center">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface border-4 border-surface-container-lowest shadow-xl mx-auto -mt-12 mb-3 relative z-10">
                                    {formData.profileimg ? (
                                        <img src={formData.profileimg} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-bold text-3xl">
                                            {(formData.name || 'U').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <h2 className="font-display-md text-lg font-extrabold text-on-surface truncate">
                                    {formData.name || 'Your Name'}
                                </h2>
                                <p className="text-xs text-on-surface-variant font-medium truncate mb-3">
                                    {formData.email || 'your.email@example.com'}
                                </p>

                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 mb-4">
                                    <span className="material-symbols-outlined text-sm">verified</span> Agro Market Partner
                                </div>

                                <div className="space-y-2 border-t border-outline-variant/20 pt-4 text-left text-xs font-semibold text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base text-primary">call</span>
                                        <span className="truncate">{formData.phone || 'No phone added'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base text-primary">location_on</span>
                                        <span className="truncate">{formData.address || 'Gujarat, India'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Quick Card */}
                        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow space-y-3">
                            <h3 className="font-title-md text-sm font-extrabold text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-base text-primary">shield</span> Account Security
                            </h3>
                            <p className="text-xs text-on-surface-variant">Update your password regularly to keep your seller account safe.</p>
                            <button
                                type="button"
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="w-full py-3 px-4 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-on-primary border border-primary/20 font-bold text-xs transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-base">lock_reset</span>
                                <span>Change Password</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Update Form (Main Area) */}
                    <div className="lg:col-span-8">
                        <div className="bg-surface-container-lowest p-5 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow">

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Photo Uploads Grid (Laptop 2 Columns) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Cover Banner Upload */}
                                    <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline-variant/20 flex flex-col justify-between space-y-3">
                                        <div>
                                            <label className="block text-xs font-bold text-on-surface mb-1">Cover Banner Photo</label>
                                            <p className="text-[11px] text-on-surface-variant">Recommended 800x400 banner image</p>
                                        </div>
                                        <div className="relative h-40 overflow-hidden bg-surface border border-outline-variant/30 flex items-center justify-center">
                                            {formData.coverimg ? (
                                                <img src={formData.coverimg} alt="Cover Banner" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-2xl text-outline">wallpaper</span>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="cover-img-upload"
                                            className="hidden"
                                            onChange={handleCoverChange}
                                        />
                                        <label
                                            htmlFor="cover-img-upload"
                                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all text-center"
                                        >
                                            <span className="material-symbols-outlined text-base">wallpaper</span>
                                            Upload Banner
                                        </label>
                                    </div>

                                    {/* Profile Avatar Upload */}
                                    <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline-variant/20 flex flex-col justify-between space-y-3">
                                        <div>
                                            <label className="block text-xs font-bold text-on-surface mb-1">Profile Avatar Photo</label>
                                            <p className="text-[11px] text-on-surface-variant">Personal picture or company logo</p>
                                        </div>
                                        <div className="flex justify-center my-1">
                                            <div className="relative w-40 h-40 overflow-hidden bg-surface border-2 border-primary/30 shadow-md flex items-center justify-center shrink-0">
                                                {formData.profileimg ? (
                                                    <img src={formData.profileimg} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-bold text-2xl">
                                                        {(formData.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="profile-img-upload"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <label
                                            htmlFor="profile-img-upload"
                                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all text-center"
                                        >
                                            <span className="material-symbols-outlined text-base">photo_camera</span>
                                            Choose Photo
                                        </label>
                                    </div>
                                </div>

                                {/* Personal Information Section */}
                                <div className="space-y-4 pt-2">
                                    <h3 className="font-title-md text-sm font-extrabold text-on-surface pb-2 border-b border-outline-variant/20 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base text-primary">person</span> Personal & Contact Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-on-surface mb-1.5">Full Name *</label>
                                            <div className="flex items-center px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                                <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">person</span>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Ramesh Patel"
                                                    className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-on-surface mb-1.5">Email Address *</label>
                                            <div className="flex items-center px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                                <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">mail</span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="e.g. ramesh@gmail.com"
                                                    className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-on-surface mb-1.5">Phone Number *</label>
                                            <div className="flex items-center px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                                <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">call</span>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="e.g. +91 90233 41592"
                                                    className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-on-surface mb-1.5">Location / Address</label>
                                            <div className="flex items-center px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                                <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">location_on</span>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Rajkot, Gujarat"
                                                    className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills & Description Section */}
                                <div className="space-y-4 pt-2">
                                    <h3 className="font-title-md text-sm font-extrabold text-on-surface pb-2 border-b border-outline-variant/20 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base text-primary">storefront</span> Agro Business & Services
                                    </h3>

                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Skills & Services (Comma Separated)</label>
                                        <div className="flex items-center px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                            <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">build</span>
                                            <input
                                                type="text"
                                                name="skills"
                                                value={formData.skills}
                                                onChange={handleChange}
                                                placeholder="e.g. Tractor Sales, Harvester Rental, Rotavator Service"
                                                className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0 font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">About / Dealership Description</label>
                                        <textarea
                                            name="description"
                                            rows={4}
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe your agricultural business background, machinery stock, or dealership experience..."
                                            className="w-full p-4 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface outline-none focus:border-primary transition-colors resize-none font-medium"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Submit & Cancel Action Buttons */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                                    <Link
                                        to="/profile"
                                        className="px-6 py-3 rounded-xl bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container-high active:scale-95 transition-all"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-lg">save</span>
                                                Save Profile Changes
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Update Password Modal */}
            <UpdatePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                userId={userData?._id || userData?.id}
            />
        </main>
    );
};

export default UpdateProfile;

