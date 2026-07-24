import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
        `font-title-sm text-base rounded-lg px-4 py-3 transition-colors active:scale-95 duration-200 flex items-center ` +
        (isActive
            ? 'text-primary font-bold bg-primary/10'
            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary font-medium');

    return (
        <nav className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-lg fixed top-0 w-full z-50 border-b border-outline-variant/30 dark:border-outline/20 shadow-sm transition-all">
            <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
                <div className="font-display-lg text-title-md font-bold text-primary dark:text-primary-fixed-dim">
                    Limbani Agro Market
                </div>
                <div className="hidden md:flex gap-8 items-center">
                    <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
                    <NavLink to="/equipments" className={desktopLinkClass}>Equipments</NavLink>
                    <NavLink to="/categories" className={desktopLinkClass}>Categories</NavLink>
                    <NavLink to="/dealers" className={desktopLinkClass}>Dealers</NavLink>
                    <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hidden md:block font-label-md text-label-md bg-surface-container text-primary px-5 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 duration-200 cursor-pointer font-semibold">
                        Login
                    </button>
                    <button className=" hidden md:block font-label-md text-label-md bg-primary-container text-on-primary px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity active:scale-95 duration-200 cursor-pointer font-semibold">
                        Sell Equipment
                    </button>
                    <button className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center" onClick={toggleMenu} aria-label="Toggle menu">
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-surface dark:bg-surface-dim border-t border-outline-variant/30 px-margin-mobile py-4 shadow-xl absolute w-full left-0 top-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <NavLink to="/" className={mobileLinkClass} onClick={toggleMenu}>Home</NavLink>
                        <NavLink to="/equipments" className={mobileLinkClass} onClick={toggleMenu}>Equipments</NavLink>
                        <NavLink to="/categories" className={mobileLinkClass} onClick={toggleMenu}>Categories</NavLink>
                        <NavLink to="/dealers" className={mobileLinkClass} onClick={toggleMenu}>Dealers</NavLink>
                        <NavLink to="/about" className={mobileLinkClass} onClick={toggleMenu}>About</NavLink>
                    </div>

                    <div className="flex flex-col gap-3 mt-2 border-t border-outline-variant/30 pt-4">
                        <button className="w-full font-label-md text-label-md bg-surface-container text-primary px-4 py-3.5 rounded-lg hover:bg-surface-container-high transition-colors font-bold">
                            Login
                        </button>
                        <button className="w-full font-label-md text-label-md bg-primary-container text-on-primary px-4 py-3.5 rounded-lg hover:opacity-90 transition-opacity font-bold">
                            Sell Equipment
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;