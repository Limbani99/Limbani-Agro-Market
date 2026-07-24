import React from 'react';
import { Link } from 'react-router-dom';

const HomeCTA = () => {
    return (
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="bg-primary rounded-[40px] p-8 md:p-16 lg:p-20 text-center card-shadow relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-secondary mb-6 drop-shadow-md">agriculture</span>
                    <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl font-bold text-on-primary mb-6 leading-tight drop-shadow-sm">
                        Ready to upgrade your farm?
                    </h2>
                    <p className="font-body-lg text-xl text-white/90 mb-12 font-light">
                        Join thousands of successful farmers who have transformed their operations with high-quality, affordable equipment from Limbani Agro Market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/equipments" className="bg-secondary text-on-secondary font-label-md text-lg px-10 py-4 rounded-full hover:bg-secondary/90 transition-colors active:scale-95 font-bold shadow-xl flex items-center justify-center gap-2">
                            Browse Equipment <span className="material-symbols-outlined">search</span>
                        </Link>
                        <Link to="/about" className="bg-transparent border-2 border-white text-white font-label-md text-lg px-10 py-4 rounded-full hover:bg-white/10 transition-colors active:scale-95 font-bold flex items-center justify-center gap-2">
                            Contact Support <span className="material-symbols-outlined">support_agent</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCTA;
