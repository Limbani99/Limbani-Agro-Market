import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <Link to="/login" className="hidden md:block font-label-md text-label-md bg-surface-container text-primary px-5 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 duration-200 cursor-pointer font-semibold">
                        Login
                    </Link>
                    <Link 
                        to="/equipments"
                        className="hidden md:block font-label-md text-label-md bg-primary-container text-on-primary px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity active:scale-95 duration-200 cursor-pointer font-semibold"
                    >
                        Sell Equipment
                    </Link>
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

                    <div className="flex flex-col gap-2.5 mt-1 border-t border-outline-variant/30 pt-3">
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full font-label-md text-label-md bg-surface-container text-primary px-4 py-3 rounded-xl hover:bg-surface-container-high active:scale-98 transition-all font-bold flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">login</span> Login
                        </Link>
                        <Link 
                            to="/equipments"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full font-label-md text-label-md bg-primary text-on-primary px-4 py-3 rounded-xl hover:bg-primary/90 active:scale-98 transition-all font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span> Sell Equipment
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;