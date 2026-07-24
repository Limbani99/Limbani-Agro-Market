import React from 'react';
import { Link } from 'react-router-dom';

const HomeHero = () => {
    return (
        <section className="relative w-full min-h-[550px] md:h-[700px] lg:h-[750px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center w-full h-full z-0 transform hover:scale-105 transition-transform duration-[20s]"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkRktGkxqZeIEYHqiPHJYQtjg9Mm3G4m2ZvOvL92ouRndOTxVqIs76XZprAgczYOhIoUj2h5iE-Re8uwI0aZkTjSNiF9QU_8wAysRV4AwVSRW3fHM9m66nJyrcIiR5tf3EDNO-1RQMYoslK2XNQvCd_n7oCQxvaE_-E3hUnUJOVTyMgQIGdzvtyVg1eVE07Ho625Ork2T2dkFSlQXjxAiqUQbzRQmU4gGBU4Md6pd6mm4APa6dzEdjZw')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 z-10"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>

            <div className="relative z-20 w-full max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center mt-8 md:mt-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary-fixed border border-primary/30 backdrop-blur-md mb-4 md:mb-6 font-bold text-xs sm:text-sm tracking-wide shadow-lg">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">verified</span>
                    India's #1 Agricultural Equipment Marketplace
                </div>

                <h1 className="font-display-lg text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-white max-w-5xl mb-4 md:mb-6 font-extrabold leading-tight drop-shadow-2xl px-2">
                    Buy & Sell Used Farming Equipment Across India
                </h1>
                <p className="font-body-lg text-base sm:text-lg md:text-2xl text-white/90 max-w-3xl mb-8 md:mb-12 drop-shadow-lg font-light px-2">
                    The most trusted, transparent, and direct marketplace to find modern agricultural machinery without any hidden commissions.
                </p>

                {/* Glassmorphism Quick Search */}


                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link to="/equipments" className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base">
                        Browse Equipment <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </Link>
                    <Link to="/about" className="bg-transparent border-2 border-white/50 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 hover:border-white transition-colors active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base">
                        How It Works <span className="material-symbols-outlined text-xl">help</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
