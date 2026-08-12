import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const Profile = () => {
    const { userData, logout } = useData();
    const [copiedContact, setCopiedContact] = useState(false);

    const storedUser = userData || JSON.parse(localStorage.getItem('user') || 'null');

    const handleCopyContact = () => {
        if (!storedUser) return;
        navigator.clipboard.writeText(`Name: ${storedUser.name || 'N/A'}\nPhone: ${storedUser.phone || 'N/A'}\nEmail: ${storedUser.email || 'N/A'}\nAddress: ${storedUser.address || 'N/A'}`);
        setCopiedContact(true);
        setTimeout(() => setCopiedContact(false), 2000);
    };

    if (!storedUser) {
        return (
            <main className="w-full pt-[76px] pb-20 min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 card-shadow text-center max-w-md w-full">
                    <span className="material-symbols-outlined text-6xl text-primary mb-4">account_circle</span>
                    <h2 className="font-title-lg text-2xl font-bold text-on-surface mb-2">Not Logged In</h2>
                    <p className="text-on-surface-variant text-sm mb-6">Please log in to view and manage your account details.</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/login" className="px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary/90 transition-all">
                            Log In
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 bg-surface-container border border-outline-variant text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container-high transition-all">
                            Register
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const skillsList = Array.isArray(storedUser.skills)
        ? storedUser.skills
        : (typeof storedUser.skills === 'string' && storedUser.skills.trim() ? storedUser.skills.split(',').map(s => s.trim()) : []);

    return (
        <main className="w-full pt-[76px] pb-16 bg-surface dark:bg-surface-dim min-h-screen">

            {/* Breadcrumb Bar */}
            <div className="bg-surface-container/50 border-b border-outline-variant/20 py-2.5 mb-6">
                <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold truncate">My Profile</span>
                    </nav>
                </div>
            </div>

            {/* HERO BANNER SECTION */}
            <section className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="relative rounded-3xl overflow-hidden card-shadow border border-outline-variant/30 bg-surface-container-lowest">

                    {/* Cover Background */}
                    <div className="relative h-40 sm:h-52 md:h-60 overflow-hidden bg-gradient-to-r from-primary/80 via-primary to-primary/90">
                        {storedUser.coverimg && (
                            <img src={storedUser.coverimg} alt="Cover Banner" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="bg-white/20 text-white font-bold text-xs px-3.5 py-1 rounded-full backdrop-blur-md border border-white/30 capitalize flex items-center gap-1">
                                <span className="material-symbols-outlined text-[15px]">badge</span>
                                {storedUser.role || 'User'} Profile
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <Link
                                to="/update-profile"
                                className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[16px]">edit</span> Edit Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-error/80 hover:bg-error text-white font-bold text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[16px]">logout</span> Log Out
                            </button>
                        </div>
                    </div>

                    {/* Profile Header Overlay */}
                    <div className="p-6 sm:p-8 relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 -mt-16 sm:-mt-20 relative z-10">

                            {/* Photo & Basic Info */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface p-2 shadow-xl border-2 border-primary/30 shrink-0 overflow-hidden">
                                    {storedUser.profileimg ? (
                                        <img
                                            src={storedUser.profileimg}
                                            alt={storedUser.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-3xl shadow-sm">
                                            {(storedUser.name || 'U').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                                        {storedUser.name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                                            {storedUser.address || "Location not provided"}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                                            {storedUser.email}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* USER DETAILS GRID */}
            <section className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Bio & Skills */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* About / Description Card */}
                        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow space-y-3">
                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                <span className="material-symbols-outlined text-[20px]">person</span> About Me
                            </div>
                            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {storedUser.description || "No bio or description added yet. Click 'Edit Profile' to add details about your farming or machinery business."}
                            </p>
                        </div>

                        {/* Skills / Services Card */}
                        {skillsList.length > 0 && (
                            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow space-y-3">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <span className="material-symbols-outlined text-[20px]">build</span> Skills & Services
                                </div>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {skillsList.map((skill, idx) => (
                                        <span key={idx} className="bg-primary/10 border border-primary/20 text-primary font-bold text-xs px-3.5 py-1.5 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Authentic Contact Info */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-4">
                                <span className="material-symbols-outlined text-[20px]">contact_phone</span> Contact Information
                            </div>

                            <div className="space-y-4 text-xs sm:text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">person</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Full Name</span>
                                        <span className="font-bold text-on-surface">{storedUser.name}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">call</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Phone Number</span>
                                        <a href={`tel:${storedUser.phone}`} className="font-bold text-primary hover:underline">
                                            {storedUser.phone || "Not provided"}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">mail</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Email Address</span>
                                        <a href={`mailto:${storedUser.email}`} className="font-bold text-on-surface hover:underline">
                                            {storedUser.email || "Not provided"}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">location_on</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Location / Address</span>
                                        <span className="font-bold text-on-surface leading-snug block">
                                            {storedUser.address || "Not provided"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-outline-variant/20 flex gap-2">
                            <Link
                                to="/update-profile"
                                className="flex-1 bg-primary text-on-primary font-bold text-xs sm:text-sm py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span> Edit Details
                            </Link>
                            <button
                                onClick={handleCopyContact}
                                className="bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">content_copy</span> {copiedContact ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
};

export default Profile;
