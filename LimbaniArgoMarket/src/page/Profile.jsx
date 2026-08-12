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
            <main className="w-full pt-[76px] pb-20 min-h-screen bg-background flex flex-col items-center justify-center px-4">
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow text-center max-w-md w-full">
                    <span className="material-symbols-outlined text-5xl sm:text-6xl text-primary mb-4">account_circle</span>
                    <h2 className="font-title-lg text-xl sm:text-2xl font-bold text-on-surface mb-2">Not Logged In</h2>
                    <p className="text-on-surface-variant text-xs sm:text-sm mb-6">Please log in to view and manage your account details.</p>
                    <div className="flex gap-3 justify-center">
                        <Link to="/login" className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs sm:text-sm rounded-xl hover:bg-primary/90 transition-all">
                            Log In
                        </Link>
                        <Link to="/register" className="px-5 py-2.5 bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm rounded-xl hover:bg-surface-container-high transition-all">
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
            <div className="bg-surface-container/50 border-b border-outline-variant/20 py-2.5 mb-4 sm:mb-6">
                <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold truncate">My Profile</span>
                    </nav>
                </div>
            </div>

            {/* HERO BANNER SECTION */}
            <section className="max-w-container-max mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden card-shadow border border-outline-variant/30 bg-surface-container-lowest">

                    {/* Cover Background */}
                    <div className="relative h-36 sm:h-52 md:h-64 overflow-hidden bg-gradient-to-r from-primary/80 via-primary to-primary/90">
                        {storedUser.coverimg && (
                            <img src={storedUser.coverimg} alt="Cover Banner" className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2 z-10">
                            <span className="bg-black/40 text-white font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/20 capitalize flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">badge</span>
                                {storedUser.role || 'User'} Profile
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-10">
                            <Link
                                to="/update-profile"
                                className="bg-black/40 hover:bg-black/60 text-white font-bold text-[11px] sm:text-xs px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1 shadow-md transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[15px]">edit</span>
                                <span>Edit</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-error/80 hover:bg-error text-white font-bold text-[11px] sm:text-xs px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md cursor-pointer transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[15px]">logout</span>
                                <span className="hidden sm:inline">Log Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Profile Header Overlay */}
                    <div className="p-4 sm:p-6 md:p-8 relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16 md:-mt-20 relative z-10">

                            {/* Photo & Basic Info */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 w-full sm:w-auto">
                                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-surface p-1.5 sm:p-2 shadow-xl border-2 border-primary/30 shrink-0 overflow-hidden">
                                    {storedUser.profileimg ? (
                                        <img
                                            src={storedUser.profileimg}
                                            alt={storedUser.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-sm">
                                            {(storedUser.name || 'U').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1 w-full sm:w-auto">
                                    <h1 className="font-display-lg text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface leading-tight break-words">
                                        {storedUser.name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                                        <span className="flex items-center gap-1 max-w-full truncate">
                                            <span className="material-symbols-outlined text-[15px] text-primary shrink-0">location_on</span>
                                            <span className="truncate">{storedUser.address || "Location not provided"}</span>
                                        </span>
                                        <span className="hidden xs:inline">•</span>
                                        <span className="flex items-center gap-1 max-w-full truncate">
                                            <span className="material-symbols-outlined text-[15px] text-primary shrink-0">mail</span>
                                            <span className="truncate">{storedUser.email}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* USER DETAILS GRID */}
            <section className="max-w-container-max mx-auto px-3 sm:px-6 lg:px-8 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

                    {/* Left Column: Bio & Skills */}
                    <div className="lg:col-span-7 space-y-5 sm:space-y-6">

                        {/* About / Description Card */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-outline-variant/30 card-shadow space-y-3">
                            <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">person</span> About Me
                            </div>
                            <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words">
                                {storedUser.description || "No bio or description added yet. Click 'Edit' to add details about your farming or machinery business."}
                            </p>
                        </div>

                        {/* Skills / Services Card */}
                        {skillsList.length > 0 && (
                            <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-outline-variant/30 card-shadow space-y-3">
                                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">build</span> Skills & Services
                                </div>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {skillsList.map((skill, idx) => (
                                        <span key={idx} className="bg-primary/10 border border-primary/20 text-primary font-bold text-[11px] sm:text-xs px-3 py-1.5 rounded-full break-words">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Contact Info */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between space-y-5 sm:space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-secondary font-bold text-xs sm:text-sm mb-3 sm:mb-4">
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">contact_phone</span> Contact Information
                            </div>

                            <div className="space-y-3.5 text-xs sm:text-sm">
                                <div className="flex items-start gap-3 overflow-hidden">
                                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl shrink-0 mt-0.5">person</span>
                                    <div className="min-w-0">
                                        <span className="text-on-surface-variant text-[11px] sm:text-xs block">Full Name</span>
                                        <span className="font-bold text-on-surface truncate block">{storedUser.name}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 overflow-hidden">
                                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl shrink-0 mt-0.5">call</span>
                                    <div className="min-w-0">
                                        <span className="text-on-surface-variant text-[11px] sm:text-xs block">Phone Number</span>
                                        <a href={`tel:${storedUser.phone}`} className="font-bold text-primary hover:underline truncate block">
                                            {storedUser.phone || "Not provided"}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 overflow-hidden">
                                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl shrink-0 mt-0.5">mail</span>
                                    <div className="min-w-0">
                                        <span className="text-on-surface-variant text-[11px] sm:text-xs block">Email Address</span>
                                        <a href={`mailto:${storedUser.email}`} className="font-bold text-on-surface hover:underline truncate block">
                                            {storedUser.email || "Not provided"}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 overflow-hidden">
                                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl shrink-0 mt-0.5">location_on</span>
                                    <div className="min-w-0">
                                        <span className="text-on-surface-variant text-[11px] sm:text-xs block">Location / Address</span>
                                        <span className="font-bold text-on-surface leading-snug block break-words">
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
                                className="flex-1 bg-primary text-on-primary font-bold text-xs sm:text-sm py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">edit</span> Edit Details
                            </Link>
                            <button
                                onClick={handleCopyContact}
                                className="bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">content_copy</span> {copiedContact ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
};

export default Profile;
