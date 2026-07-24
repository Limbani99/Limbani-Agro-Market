import React from 'react';

const AboutHero = () => {
    return (
        <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img alt="Modern agricultural background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAopxn5Zb3qW4oFfQDyGrdfmw6GTuWdsp-ycKBkw68SnL_CZrUncAkJetQHMmpOzNvFjWfGhnJMxfDWM0HuSPB5xRdTd2EhRXBQkGhJ3VFSP8Nhx627PZe3SMmLtEM2f1_g1RGd4fZ7dZa35Cgr-_4Ek4U9y759CDUP9Dj5M9p1JS8rj7g4dhb8lrCrB_n4PF2OYyqYj32qGprjTyryHIu4AFU66rK20cdvqsC5JzZ9FS20S6ca195UTA" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop py-16 md:py-24 text-left flex flex-col items-start">
                <h1 className="font-display-lg text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 max-w-3xl drop-shadow-lg font-bold leading-tight">
                    Empowering Farmers Through a Trusted Agricultural Marketplace
                </h1>
                <p className="font-body-lg text-sm sm:text-base md:text-xl text-white/90 max-w-2xl drop-shadow-md mb-6 md:mb-10 font-light leading-relaxed">
                    Limbani Agro Market connects farmers, equipment owners, and dealers across India, making it simple to buy, sell, and discover agricultural machinery.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-primary text-on-primary font-label-md text-sm md:text-label-md px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors active:scale-95 duration-200 shadow-lg font-bold flex items-center justify-center gap-2">
                        Explore Equipment <span className="material-symbols-outlined text-[18px] md:text-[20px]">agriculture</span>
                    </button>
                    <button className="bg-surface/10 backdrop-blur-md border-2 border-white text-white font-label-md text-sm md:text-label-md px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors active:scale-95 duration-200 font-bold flex items-center justify-center gap-2">
                        Become a Seller <span className="material-symbols-outlined text-[18px] md:text-[20px]">storefront</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
