import React from 'react';

const DealerPartnership = () => {
    const benefits = [
        "Business Store", "Premium Badge", "Featured Homepage", 
        "Unlimited Listings", "Advertisement", "Analytics Dashboard"
    ];

    return (
        <section className="py-20 bg-secondary-container/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="bg-surface rounded-3xl p-8 md:p-12 lg:p-16 card-shadow border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm mb-6 border border-secondary/20 font-bold">
                            <span className="material-symbols-outlined text-[16px]">storefront</span>
                            For Dealers
                        </div>
                        <h2 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-6">Partner With Us</h2>
                        <p className="text-on-surface-variant text-lg mb-8">
                            Are you an agricultural equipment dealer? Join Limbani Agro Market to expand your reach, manage your inventory digitally, and connect with thousands of buyers actively looking for machinery in your area.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-secondary">star</span>
                                    <span className="font-title-sm font-semibold text-on-surface">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-secondary text-on-secondary font-label-md px-8 py-3.5 rounded-lg hover:bg-secondary/90 font-bold shadow-md active:scale-95 transition-all w-full sm:w-auto">
                            Become a Dealer
                        </button>
                    </div>

                    <div className="relative h-[400px] rounded-2xl overflow-hidden card-shadow">
                        <img 
                            src="https://images.unsplash.com/photo-1574676140683-bc2a23e8006b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="Dealer Partnership" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <h3 className="font-title-lg font-bold mb-2">"Limbani Agro Market doubled my sales."</h3>
                            <p className="text-white/80 text-sm">- Rajesh Tractors, Gujarat</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealerPartnership;
