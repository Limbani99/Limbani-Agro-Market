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
        <main className="w-full pt-[76px] pb-20 min-h-screen bg-background">

            {/* Breadcrumb Navigation */}
            <div className="bg-surface border-b border-outline-variant/20 py-3.5 mb-6 md:mb-8">
                <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold">Edit Profile</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">

                {/* Card Container */}
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow">

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/20">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-2xl">manage_accounts</span>
                        </div>
                        <div>
                            <h1 className="font-display-md text-2xl font-bold text-on-surface">Update Your Profile</h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant">Update your account details and profile images</p>
                        </div>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-semibold text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl">check_circle</span>
                            {message}
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-6 p-4 rounded-2xl bg-error/10 border border-error/20 text-error font-semibold text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl">error</span>
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Cover Banner Image Section */}
                        <div className="space-y-2 p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                            <label className="block text-xs font-bold text-on-surface mb-1">Cover / Background Banner</label>
                            <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden bg-surface border-2 border-primary/20 flex items-center justify-center">
                                {formData.coverimg ? (
                                    <img src={formData.coverimg} alt="Cover Banner" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-primary/80 via-primary to-primary/90 flex flex-col items-center justify-center text-white p-4">
                                        <span className="material-symbols-outlined text-3xl mb-1">wallpaper</span>
                                        <span className="text-xs font-semibold">No custom cover banner uploaded</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end pt-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="cover-img-upload"
                                    className="hidden"
                                    onChange={handleCoverChange}
                                />
                                <label
                                    htmlFor="cover-img-upload"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all"
                                >
                                    <span className="material-symbols-outlined text-base">wallpaper</span>
                                    Upload Banner Photo
                                </label>
                            </div>
                        </div>

                        {/* Profile Image Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-surface border-2 border-primary/30 shrink-0">
                                {formData.profileimg ? (
                                    <img src={formData.profileimg} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-bold text-3xl">
                                        {(formData.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <label className="block text-xs font-bold text-on-surface mb-1">Profile Avatar Photo</label>
                                <p className="text-xs text-on-surface-variant mb-3">Upload your personal photo or logo (JPEG/PNG)</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="profile-img-upload"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="profile-img-upload"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all"
                                >
                                    <span className="material-symbols-outlined text-base">photo_camera</span>
                                    Choose Profile Photo
                                </label>
                            </div>
                        </div>

                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-2">Full Name *</label>
                                <div className="flex items-center px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-xl mr-2">person</span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Ramesh Patel"
                                        className="w-full bg-transparent border-none text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-2">Email Address *</label>
                                <div className="flex items-center px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-xl mr-2">mail</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g. ramesh@gmail.com"
                                        className="w-full bg-transparent border-none text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone & Address Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-2">Phone Number *</label>
                                <div className="flex items-center px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-xl mr-2">call</span>
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. +91 90233 41592"
                                        className="w-full bg-transparent border-none text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-2">Location / Address</label>
                                <div className="flex items-center px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-outline text-xl mr-2">location_on</span>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="e.g. Rajkot, Gujarat"
                                        className="w-full bg-transparent border-none text-sm text-on-surface outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills / Services */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">Skills & Services (Comma Separated)</label>
                            <div className="flex items-center px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 focus-within:border-primary transition-colors">
                                <span className="material-symbols-outlined text-outline text-xl mr-2">build</span>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="e.g. Tractor Repair, Rotavator Service, Harvester Dealer"
                                    className="w-full bg-transparent border-none text-sm text-on-surface outline-none focus:ring-0"
                                />
                            </div>
                        </div>

                        {/* Description / About */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">About / Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your farming operations or dealership background..."
                                className="w-full p-4 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm text-on-surface outline-none focus:border-primary transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                            <Link
                                to="/profile"
                                className="px-6 py-3 rounded-2xl bg-surface-container border border-outline-variant text-on-surface font-bold text-sm hover:bg-surface-container-high active:scale-95 transition-all"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">save</span>
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
