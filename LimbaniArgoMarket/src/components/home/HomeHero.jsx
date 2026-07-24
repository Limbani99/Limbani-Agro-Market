import React from 'react';
import { Link } from 'react-router-dom';

const HomeHero = () => {
    return (
        <section className="relative w-full h-[600px] md:h-[750px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center w-full h-full z-0 transform hover:scale-105 transition-transform duration-[20s]"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkRktGkxqZeIEYHqiPHJYQtjg9Mm3G4m2ZvOvL92ouRndOTxVqIs76XZprAgczYOhIoUj2h5iE-Re8uwI0aZkTjSNiF9QU_8wAysRV4AwVSRW3fHM9m66nJyrcIiR5tf3EDNO-1RQMYoslK2XNQvCd_n7oCQxvaE_-E3hUnUJOVTyMgQIGdzvtyVg1eVE07Ho625Ork2T2dkFSlQXjxAiqUQbzRQmU4gGBU4Md6pd6mm4APa6dzEdjZw')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 z-10"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>

            <div className="relative z-20 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center mt-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-fixed border border-primary/30 backdrop-blur-md mb-6 font-bold text-sm tracking-wide shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    India's #1 Agricultural Equipment Marketplace
                </div>

                <h1 className="font-display-lg text-4xl md:text-5xl lg:text-7xl text-white max-w-5xl mb-6 font-extrabold leading-tight drop-shadow-2xl">
                    Buy & Sell Used Farming Equipment Across India
                </h1>
                <p className="font-body-lg text-lg md:text-2xl text-white/90 max-w-3xl mb-12 drop-shadow-lg font-light">
                    The most trusted, transparent, and direct marketplace to find modern agricultural machinery without any hidden commissions.
                </p>

                {/* Glassmorphism Quick Search */}


                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/equipments" className="bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        Browse Equipment <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </Link>
                    <Link to="/about" className="bg-transparent border-2 border-white/50 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 hover:border-white transition-colors active:scale-95 flex items-center justify-center gap-2">
                        How It Works <span className="material-symbols-outlined text-xl">help</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
