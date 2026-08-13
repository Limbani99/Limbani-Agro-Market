import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataProvider';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { userData, login } = useData();
    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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

            <div className="max-w-3xl mx-auto px-3 sm:px-margin-mobile md:px-margin-desktop">

                {/* Card Container */}
                <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 card-shadow">

                    <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 pb-3.5 sm:pb-4 border-b border-outline-variant/20">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                                <span className="material-symbols-outlined text-xl sm:text-2xl">manage_accounts</span>
                            </div>
                            <div className="min-w-0">
                                <h1 className="font-display-md text-lg sm:text-2xl font-bold text-on-surface truncate">Update Your Profile</h1>
                                <p className="text-[11px] sm:text-sm text-on-surface-variant truncate">Update your account details and profile images</p>
                            </div>
                        </div>
                        <Link
                            to="/profile"
                            className="px-3 py-2 sm:px-4 sm:py-2.5 bg-surface-container-high hover:bg-primary/10 hover:text-primary border border-outline-variant/40 rounded-xl text-xs sm:text-sm font-bold text-on-surface transition-all shrink-0 flex items-center gap-1.5 active:scale-95 shadow-sm whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
                            <span>Go Back</span>
                        </Link>
                    </div>

                    {message && (
                        <div className="mb-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg sm:text-xl">check_circle</span>
                            {message}
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-error/10 border border-error/20 text-error font-semibold text-xs sm:text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg sm:text-xl">error</span>
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

                        {/* Cover Banner Image Section */}
                        <div className="space-y-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                            <label className="block text-xs font-bold text-on-surface mb-1">Cover / Background Banner</label>
                            <div className="relative h-28 sm:h-40 rounded-xl overflow-hidden bg-surface border-2 border-primary/20 flex items-center justify-center">
                                {formData.coverimg ? (
                                    <img src={formData.coverimg} alt="Cover Banner" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-primary/80 via-primary to-primary/90 flex flex-col items-center justify-center text-white p-3 text-center">
                                        <span className="material-symbols-outlined text-2xl sm:text-3xl mb-1">wallpaper</span>
                                        <span className="text-[11px] sm:text-xs font-semibold">No custom cover banner uploaded</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end pt-1 sm:pt-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="cover-img-upload"
                                    className="hidden"
                                    onChange={handleCoverChange}
                                />
                                <label
                                    htmlFor="cover-img-upload"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all"
                                >
                                    <span className="material-symbols-outlined text-sm sm:text-base">wallpaper</span>
                                    Upload Banner Photo
                                </label>
                            </div>
                        </div>

                        {/* Profile Avatar Image Section - Horizontal layout on mobile */}
                        <div className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-surface border-2 border-primary/30 shrink-0">
                                {formData.profileimg ? (
                                    <img src={formData.profileimg} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl sm:text-3xl">
                                        {(formData.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <label className="block text-xs font-bold text-on-surface mb-0.5 truncate">Profile Avatar Photo</label>
                                <p className="text-[11px] sm:text-xs text-on-surface-variant mb-2 truncate sm:whitespace-normal">Upload your personal photo or logo (JPEG/PNG)</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="profile-img-upload"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="profile-img-upload"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all shrink-0"
                                >
                                    <span className="material-symbols-outlined text-sm sm:text-base">photo_camera</span>
                                    Choose Profile Photo
                                </label>
                            </div>
                        </div>

                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1 sm:mb-2">Full Name *</label>
                                <div className="flex items-center px-3.5 py-2.5 sm:px-4 sm:py-3 bg-surface-container/50 rounded-xl sm:rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-lg sm:text-xl mr-2 shrink-0">person</span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Ramesh Patel"
                                        className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1 sm:mb-2">Email Address *</label>
                                <div className="flex items-center px-3.5 py-2.5 sm:px-4 sm:py-3 bg-surface-container/50 rounded-xl sm:rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-lg sm:text-xl mr-2 shrink-0">mail</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g. ramesh@gmail.com"
                                        className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone & Address Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1 sm:mb-2">Phone Number *</label>
                                <div className="flex items-center px-3.5 py-2.5 sm:px-4 sm:py-3 bg-surface-container/50 rounded-xl sm:rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-lg sm:text-xl mr-2 shrink-0">call</span>
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. +91 90233 41592"
                                        className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1 sm:mb-2">Location / Address</label>
                                <div className="flex items-center px-3.5 py-2.5 sm:px-4 sm:py-3 bg-surface-container/50 rounded-xl sm:rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-lg sm:text-xl mr-2 shrink-0">location_on</span>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="e.g. Rajkot, Gujarat"
                                        className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills / Services */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-1 sm:mb-2">Skills & Services (Comma Separated)</label>
                            <div className="flex items-center px-3.5 py-2.5 sm:px-4 sm:py-3 bg-surface-container/50 rounded-xl sm:rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                <span className="material-symbols-outlined text-outline text-lg sm:text-xl mr-2 shrink-0">build</span>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="e.g. Tractor Repair, Rotavator Service, Harvester Dealer"
                                    className="w-full bg-transparent border-none text-xs sm:text-sm text-on-surface outline-none focus:ring-0"
                                />
                            </div>
                        </div>

                        {/* Description / About */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-1 sm:mb-2">About / Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your farming operations or dealership background..."
                                className="w-full p-3 sm:p-4 bg-surface-container/50 rounded-xl sm:rounded-2xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface outline-none focus:border-primary transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-outline-variant/20">
                            <Link
                                to="/profile"
                                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container-high active:scale-95 transition-all"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-primary text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-base sm:text-lg">save</span>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
};

export default UpdateProfile;

