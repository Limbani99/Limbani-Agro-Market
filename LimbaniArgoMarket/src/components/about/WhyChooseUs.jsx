import React from 'react';

const WhyChooseUs = () => {
    const features = [
        "Verified Sellers", "Verified Dealers", "Direct WhatsApp Contact", 
        "No Hidden Commission", "Easy Search", "Fast Selling", 
        "Secure Listings", "Farmer Friendly"
    ];

    return (
        <section className="py-20 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-1 text-center lg:text-left">
                        <h2 className="font-display-md text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-4 sm:mb-6">Why Choose Us?</h2>
                        <p className="text-on-surface-variant text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                            Limbani Agro Market provides the safest, fastest, and most transparent platform for all your agricultural equipment needs. We put the power back in the hands of the farmer.
                        </p>
                        <button className="w-full sm:w-auto bg-primary text-on-primary font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl hover:bg-primary/90 shadow-md active:scale-95 transition-all">
                            Get Started Today
                        </button>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-surface p-3 sm:p-5 rounded-2xl border border-outline-variant/30 card-shadow flex items-center gap-2.5 sm:gap-4 hover:border-primary/40 transition-colors">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-base sm:text-xl">check_circle</span>
                                    </div>
                                    <h4 className="font-title-md text-xs sm:text-base font-bold text-on-surface">{feature}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
