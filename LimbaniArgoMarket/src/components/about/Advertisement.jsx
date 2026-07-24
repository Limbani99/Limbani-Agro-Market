import React from 'react';

const Advertisement = () => {
    const advertisers = [
        "Tractor Companies", "Spare Parts Shops", "Finance Companies", 
        "Insurance Companies", "Seed Companies", "Fertilizer Companies", 
        "Agriculture Startups"
    ];

    return (
        <section className="py-20 bg-surface border-y border-outline-variant/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-12">
                    <h2 className="font-display-md text-3xl font-bold text-on-surface mb-4">Advertisement Opportunities</h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto">Reach thousands of active farmers daily. Promote your products and services directly to your target audience on Limbani Agro Market.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-surface-container-lowest p-8 md:p-12 rounded-3xl card-shadow border border-outline-variant/30">
                    <div>
                        <h3 className="font-title-lg text-2xl font-bold text-on-surface mb-6">Who can advertise?</h3>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {advertisers.map((adv, idx) => (
                                <span key={idx} className="bg-primary/5 border border-primary/20 text-primary px-4 py-2 rounded-full font-title-sm font-semibold">
                                    {adv}
                                </span>
                            ))}
                        </div>
                        <button className="bg-primary text-on-primary font-label-md px-8 py-3 rounded-lg hover:bg-primary/90 font-bold shadow-md active:scale-95 transition-all">
                            Advertise With Us
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface p-6 rounded-2xl text-center border border-outline-variant/30 shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-2">visibility</span>
                            <h4 className="font-bold text-xl">100k+</h4>
                            <p className="text-sm text-on-surface-variant">Monthly Views</p>
                        </div>
                        <div className="bg-surface p-6 rounded-2xl text-center border border-outline-variant/30 shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-secondary mb-2">touch_app</span>
                            <h4 className="font-bold text-xl">High</h4>
                            <p className="text-sm text-on-surface-variant">Engagement Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Advertisement;
