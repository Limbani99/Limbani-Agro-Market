import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-[85vh] w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-margin-mobile md:px-margin-desktop bg-surface dark:bg-surface-dim relative overflow-hidden transition-colors">
            
            {/* Background Decorative Glow Circles */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                
                {/* Visual 404 Badge / Illustration */}
                <div className="relative inline-block">
                    <span className="font-display-lg text-7xl sm:text-9xl font-black text-primary/20 dark:text-primary-fixed-dim/20 tracking-widest select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary/15 dark:bg-primary/25 border border-primary/30 text-primary flex items-center justify-center shadow-xl backdrop-blur-md animate-bounce">
                            <span className="material-symbols-outlined text-4xl sm:text-5xl">agriculture</span>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary font-bold text-xs border border-secondary/30 uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm">explore_off</span> Page Not Found
                    </span>
                    <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface leading-tight">
                        Lost in the Fields?
                    </h1>
                    <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed font-normal">
                        The page you are looking for might have been moved, renamed, or never existed in Limbani Agro Market.
                    </p>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto bg-primary text-on-primary font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl hover:bg-primary/90 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-xl">home</span>
                        <span>Back to Home</span>
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                        <span>Go Back</span>
                    </button>
                </div>

                {/* Quick Helpful Links Bar */}
                <div className="pt-8 border-t border-outline-variant/30 space-y-3">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Or explore these popular pages:</span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Link to="/equipments" className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest dark:bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">agriculture</span> Equipments
                        </Link>
                        <Link to="/categories" className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest dark:bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">category</span> Categories
                        </Link>
                        <Link to="/dealers" className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest dark:bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">storefront</span> Verified Dealers
                        </Link>
                        <Link to="/add-product" className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest dark:bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">add_circle</span> Sell Equipment
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default NotFound;
