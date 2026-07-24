import React from 'react';

const OurImpact = () => {
    return (
        <section className="py-20 bg-surface border-y border-outline-variant/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 flex justify-center">
                        <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-full aspect-square flex items-center justify-center card-shadow relative">
                            {/* Placeholder for an actual India Map SVG or Image */}
                            <span className="material-symbols-outlined text-[150px] text-primary/20">map</span>
                            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-tertiary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-6">Our Nationwide Impact</h2>
                        <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                            Since our inception, Limbani Agro Market has rapidly expanded its footprint across India. We are breaking geographical barriers and uniting the agricultural community on a single digital platform.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-display-lg text-3xl font-bold text-on-surface mb-1">28</h4>
                                <p className="font-body-sm text-on-surface-variant font-medium">States Covered</p>
                            </div>
                            <div className="border-l-4 border-secondary pl-4">
                                <h4 className="font-display-lg text-3xl font-bold text-on-surface mb-1">5,000+</h4>
                                <p className="font-body-sm text-on-surface-variant font-medium">Cities & Villages</p>
                            </div>
                            <div className="border-l-4 border-tertiary pl-4">
                                <h4 className="font-display-lg text-3xl font-bold text-on-surface mb-1">₹500 Cr+</h4>
                                <p className="font-body-sm text-on-surface-variant font-medium">Equipment Exchanged</p>
                            </div>
                            <div className="border-l-4 border-[#25D366] pl-4">
                                <h4 className="font-display-lg text-3xl font-bold text-on-surface mb-1">50k+</h4>
                                <p className="font-body-sm text-on-surface-variant font-medium">Happy Farmers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurImpact;
