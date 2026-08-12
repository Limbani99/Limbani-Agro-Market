import React from 'react';
import { Link } from 'react-router-dom';

const HomeHero = () => {
    return (
        <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] flex items-end lg:items-center justify-center pt-24 pb-8 sm:pb-12 lg:py-16 px-4 sm:px-margin-mobile md:px-margin-desktop overflow-hidden bg-[#15120D]">

            {/* Background Image: Farmer & Family on Tractor */}
            <div
                className="absolute inset-0 bg-cover bg-[position:22%_center] lg:bg-[position:16%_center] w-full h-full z-0 motion-safe:scale-105 opacity-95 pointer-events-none"
                style={{ backgroundImage: "url('/farmer_family_tractor.png')" }}
            ></div>

            {/* Gradient Overlays: Clear Left for Farmer Family, Rich Dark on Right for Text Readability */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#15120D]/85 via-[#15120D]/40 to-[#15120D]/30 z-10 pointer-events-none"></div>

            {/* Main Container */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end lg:items-center relative z-20 w-full">

                {/* Left Space - Desktop */}
                <div className="hidden lg:block lg:col-span-5 min-h-[280px]"></div>

                {/* Content at Bottom */}
                <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center mt-auto lg:mt-0 pb-1 sm:pb-0">

                    {/* Trust Tagline Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A438]/20 text-[#E8C468] font-bold text-[10px] sm:text-xs border border-[#D9A438]/30 shadow-md backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9A438]"></span>

                        <span>
                            India's #1 Agricultural Equipment Marketplace
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="font-display-lg text-center text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.22] tracking-tight drop-shadow-lg">
                        Buy & Sell{" "}
                        <span className="bg-gradient-to-r from-[#E8C468] via-[#D9A438] to-[#C4872A] bg-clip-text text-transparent">
                            Farming Machinery
                        </span>{" "}
                        Directly Across India
                    </h1>

                    {/* Subtitle */}
                    <p className="font-body-lg text-center text-[11px] sm:text-sm text-white/90 leading-relaxed font-normal max-w-xl mx-auto drop-shadow-md">
                        Empowering Indian farmers and agricultural families. Connect directly with verified sellers, dealers, and workshops. Buy used tractors, rotavators, harvesters, and implements — 0% hidden commission.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 pt-1.5">

                        {/* Browse Equipment */}
                        <Link
                            to="/equipments"
                            className="bg-primary text-on-primary font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <span>Browse Equipment</span>

                            <span className="material-symbols-outlined text-sm sm:text-base">
                                arrow_forward
                            </span>
                        </Link>

                        {/* Sell Machinery */}
                        <Link
                            to="/add-product"
                            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 backdrop-blur-md cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[#D9A438] text-sm sm:text-base">
                                add_circle
                            </span>

                            <span>
                                Sell Machinery
                            </span>
                        </Link>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default HomeHero;