import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const Navbar = () => {
    const { isLoggedIn, role, userData, logout } = useData();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navProfileImg = userData?.profileimg || userData?.profilePicture || userData?.profile;

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const desktopLinkClass = ({ isActive }) =>
        `font-label-lg text-sm transition-all duration-200 cursor-pointer border-b-2 pb-1 active:scale-95 ` +
        (isActive
            ? 'text-primary dark:text-primary-fixed-dim border-primary font-bold'
            : 'text-on-surface-variant dark:text-on-tertiary-container border-transparent hover:text-primary font-semibold');

    const mobileLinkClass = ({ isActive }) =>
        `font-title-sm text-base rounded-xl px-4 py-3 transition-all active:scale-98 duration-200 flex items-center gap-3 ` +
        (isActive
            ? 'text-primary font-bold bg-primary/10 border-l-4 border-primary'
            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary font-medium');

    return (
        <nav className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-lg fixed top-0 w-full z-50 border-b border-outline-variant/30 dark:border-outline/20 shadow-sm transition-all">
            <div className="flex justify-between items-center px-3 sm:px-margin-mobile md:px-margin-desktop py-3 md:py-4 max-w-container-max mx-auto">
                <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0">
                    <img src="/logo.png" alt="Limbani Agro Market Logo" className="w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 object-contain rounded-lg shrink-0" />
                    <span className="font-display-lg text-sm sm:text-base md:text-title-lg font-bold text-primary dark:text-primary-fixed-dim leading-tight truncate">
                        Limbani Agro Market
                    </span>
                </Link>
                <div className="hidden md:flex gap-8 items-center">
                    <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
                    <NavLink to="/equipments" className={desktopLinkClass}>Equipments</NavLink>
                    <NavLink to="/categories" className={desktopLinkClass}>Categories</NavLink>
                    <NavLink to="/dealers" className={desktopLinkClass}>Dealers</NavLink>
                    <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
                </div>
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-2 rounded-full border border-outline-variant/40 transition-all cursor-pointer active:scale-95"
                                aria-expanded={isProfileOpen}
                                aria-label="User Profile Menu"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 overflow-hidden">
                                    {navProfileImg ? (
                                        <img src={navProfileImg} alt="Profile" className="w-full h-full object-cover" />
                                    ) : userData?.name ? (
                                        userData.name.charAt(0).toUpperCase()
                                    ) : (
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    )}
                                </div>
                                <span className="hidden sm:inline font-label-md text-sm font-semibold text-on-surface max-w-[120px] truncate">
                                    {userData?.name || 'Account'}
                                </span>
                                <span
                                    className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200"
                                    style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                >
                                    expand_more
                                </span>
                            </button>

                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-64 bg-surface dark:bg-surface-dim border border-outline-variant/30 rounded-2xl shadow-xl py-2 z-50 animate-[slideDown_0.2s_ease-out]">
                                        <div className="px-4 py-3 border-b border-outline-variant/20 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-base shadow-sm overflow-hidden">
                                                {navProfileImg ? (
                                                    <img src={navProfileImg} alt="Profile" className="w-full h-full object-cover" />
                                                ) : userData?.name ? (
                                                    userData.name.charAt(0).toUpperCase()
                                                ) : (
                                                    <span className="material-symbols-outlined">person</span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-bold text-sm text-on-surface truncate">
                                                    {userData?.name || 'User'}
                                                </p>
                                                <p className="text-xs text-on-surface-variant truncate">
                                                    {userData?.email || userData?.phone || 'Logged In'}
                                                </p>
                                                {userData?.role && (
                                                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-primary/15 text-primary border border-primary/20">
                                                        {userData.role}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
                                                My Profile
                                            </Link>
                                            <Link
                                                to="/add-product"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-primary">add</span>
                                                Add Product
                                            </Link>
                                        </div>

                                        <div className="border-t border-outline-variant/20 pt-1">
                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    logout();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-error hover:bg-error/10 transition-colors cursor-pointer text-left"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-error">logout</span>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="hidden md:block font-label-md text-label-md bg-surface-container text-primary px-5 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 duration-200 cursor-pointer font-semibold">
                                Login
                            </Link>
                            <Link
                                to="/add-product"
                                className="hidden md:block font-label-md text-label-md bg-primary-container text-on-primary px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity active:scale-95 duration-200 cursor-pointer font-semibold"
                            >
                                Sell Equipment
                            </Link>
                        </>
                    )}

                    <button className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center" onClick={toggleMenu} aria-label="Toggle menu">
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-surface dark:bg-surface-dim border-t border-outline-variant/30 px-3 sm:px-margin-mobile py-4 shadow-xl absolute w-full left-0 top-full flex flex-col gap-4 animate-[slideDown_0.2s_ease-out]">
                    <div className="flex flex-col gap-1">
                        <NavLink to="/" className={mobileLinkClass} onClick={toggleMenu}>
                            <span className="material-symbols-outlined text-[20px]">home</span> Home
                        </NavLink>
                        <NavLink to="/equipments" className={mobileLinkClass} onClick={toggleMenu}>
                            <span className="material-symbols-outlined text-[20px]">agriculture</span> Equipments
                        </NavLink>
                        <NavLink to="/categories" className={mobileLinkClass} onClick={toggleMenu}>
                            <span className="material-symbols-outlined text-[20px]">category</span> Categories
                        </NavLink>
                        <NavLink to="/dealers" className={mobileLinkClass} onClick={toggleMenu}>
                            <span className="material-symbols-outlined text-[20px]">storefront</span> Dealers
                        </NavLink>
                        <NavLink to="/about" className={mobileLinkClass} onClick={toggleMenu}>
                            <span className="material-symbols-outlined text-[20px]">info</span> About
                        </NavLink>
                    </div>

                    {isLoggedIn ? (
                        <div className="flex flex-col gap-2 mt-1 border-t border-outline-variant/30 pt-3">
                            <div className="flex items-center gap-3 px-2 py-1 mb-1">
                                <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm overflow-hidden">
                                    {navProfileImg ? (
                                        <img src={navProfileImg} alt="Profile" className="w-full h-full object-cover" />
                                    ) : userData?.name ? (
                                        userData.name.charAt(0).toUpperCase()
                                    ) : (
                                        <span className="material-symbols-outlined">person</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-sm text-on-surface truncate">{userData?.name || 'User'}</p>
                                    <p className="text-xs text-on-surface-variant truncate">{userData?.email || userData?.phone}</p>
                                </div>
                            </div>
                            <Link
                                to="/profile"
                                onClick={toggleMenu}
                                className="w-full font-label-md text-label-md bg-surface-container text-primary px-4 py-3 rounded-xl hover:bg-surface-container-high active:scale-98 transition-all font-bold flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">account_circle</span> My Profile
                            </Link>
                            <button
                                onClick={() => {
                                    toggleMenu();
                                    logout();
                                }}
                                className="w-full font-label-md text-label-md bg-error/10 text-error border border-error/20 px-4 py-3 rounded-xl hover:bg-error/20 active:scale-98 transition-all font-bold flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">logout</span> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2.5 mt-1 border-t border-outline-variant/30 pt-3">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full font-label-md text-label-md bg-surface-container text-primary px-4 py-3 rounded-xl hover:bg-surface-container-high active:scale-98 transition-all font-bold flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">login</span> Login
                            </Link>
                            <Link
                                to="/add-product"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full font-label-md text-label-md bg-primary text-on-primary px-4 py-3 rounded-xl hover:bg-primary/90 active:scale-98 transition-all font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_circle</span> Sell Equipment
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav >
    );
};

export default Navbar;