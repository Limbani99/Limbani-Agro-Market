import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-lg fixed top-0 w-full z-50 border-b border-outline-variant/30 dark:border-outline/20 shadow-sm transition-all">
            <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
                <div className="font-display-lg text-title-md font-bold text-primary dark:text-primary-fixed-dim">
                    Limbani Agro Market
                </div>
                <div className="hidden md:flex gap-6 items-center">
                    <NavLink to="/" className={({ isActive }) => `font-bold border-b-2 pb-1 active:scale-95 duration-200 cursor-pointer ${isActive ? 'text-primary dark:text-primary-fixed-dim border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'}`}>Home</NavLink>
                    <NavLink to="/categories" className={({ isActive }) => `font-body-md text-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-highest rounded px-2 py-1 active:scale-95 duration-200 cursor-pointer ${isActive ? 'text-primary dark:text-primary-fixed-dim font-bold bg-primary/10' : 'text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors'}`}>Categories</NavLink>
                    <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest rounded px-2 py-1 active:scale-95 duration-200 cursor-pointer" href="#">Dealers</a>
                    <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest rounded px-2 py-1 active:scale-95 duration-200 cursor-pointer" href="#">Custom Work</a>
                    <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest rounded px-2 py-1 active:scale-95 duration-200 cursor-pointer" href="#">Blog</a>
                    <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest rounded px-2 py-1 active:scale-95 duration-200 cursor-pointer" href="#">About</a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined hover:text-primary cursor-pointer active:scale-95 duration-200 transition-all">language</span>
                        <span className="material-symbols-outlined hover:text-primary cursor-pointer active:scale-95 duration-200 transition-all">search</span>
                    </div>
                    <button className="hidden md:block font-label-md text-label-md bg-surface-container text-primary px-4 py-2 rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 duration-200 cursor-pointer">Login</button>
                    <button className="hidden md:block font-label-md text-label-md bg-primary-container text-on-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95 duration-200 cursor-pointer">Sell Equipment</button>
                    <button className="material-symbols-outlined md:hidden cursor-pointer" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMobileMenuOpen ? 'close' : 'menu'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-surface dark:bg-surface-dim border-t border-outline-variant/30 px-margin-mobile py-4 shadow-lg absolute w-full left-0 top-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <NavLink to="/" className={({ isActive }) => `font-body-md text-body-md rounded px-2 py-2 ${isActive ? 'text-primary font-bold bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>Home</NavLink>
                        <NavLink to="/categories" className={({ isActive }) => `font-body-md text-body-md rounded px-2 py-2 ${isActive ? 'text-primary font-bold bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>Categories</NavLink>
                        <a className="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low rounded px-2 py-2" href="#">Dealers</a>
                        <a className="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low rounded px-2 py-2" href="#">Custom Work</a>
                        <a className="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low rounded px-2 py-2" href="#">Blog</a>
                        <a className="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low rounded px-2 py-2" href="#">About</a>
                    </div>
                    <div className="flex gap-2 text-on-surface-variant px-2 py-2 border-t border-outline-variant/30">
                        <span className="material-symbols-outlined cursor-pointer">language</span>
                        <span className="font-body-md text-body-md">Language</span>
                    </div>
                    <div className="flex gap-2 text-on-surface-variant px-2 pb-2">
                        <span className="material-symbols-outlined cursor-pointer">search</span>
                        <span className="font-body-md text-body-md">Search</span>
                    </div>
                    <div className="flex flex-col gap-3 mt-2 border-t border-outline-variant/30 pt-4">
                        <button className="w-full font-label-md text-label-md bg-surface-container text-primary px-4 py-3 rounded-lg hover:bg-surface-container-high transition-colors">Login</button>
                        <button className="w-full font-label-md text-label-md bg-primary-container text-on-primary px-4 py-3 rounded-lg hover:opacity-90 transition-opacity">Sell Equipment</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;