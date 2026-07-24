import React from 'react';

const HowItWorks = () => {
    const sellerSteps = [
        { title: "Create Account", icon: "person_add" },
        { title: "Upload Equipment", icon: "upload_file" },
        { title: "Add Images", icon: "add_a_photo" },
        { title: "Receive Calls & WhatsApp", icon: "forum" },
        { title: "Sell Directly", icon: "handshake" }
    ];

    const buyerSteps = [
        { title: "Browse Equipment", icon: "search" },
        { title: "Filter Results", icon: "tune" },
        { title: "View Details", icon: "info" },
        { title: "Call Seller", icon: "call" },
        { title: "Buy Directly", icon: "shopping_cart_checkout" }
    ];

    return (
        <section className="py-20 bg-surface">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-4 border border-primary/20 font-bold">
                        <span className="material-symbols-outlined text-[16px]">account_tree</span>
                        How It Works
                    </div>
                    <h2 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface">Simple, Fast, and Secure</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* For Sellers */}
                    <div className="bg-surface-container-lowest p-8 rounded-3xl card-shadow border border-outline-variant/30 relative">
                        <h3 className="font-title-lg text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl">storefront</span> For Sellers
                        </h3>
                        <div className="relative">
                            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-primary/20"></div>
                            <div className="space-y-8 relative">
                                {sellerSteps.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-full bg-surface border-4 border-primary/20 flex items-center justify-center relative z-10 shadow-sm text-primary">
                                            <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                                        </div>
                                        <div className="bg-surface flex-1 p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                                            <h4 className="font-title-md font-bold text-on-surface">{step.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* For Buyers */}
                    <div className="bg-surface-container-lowest p-8 rounded-3xl card-shadow border border-outline-variant/30 relative">
                        <h3 className="font-title-lg text-2xl font-bold text-secondary mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl">shopping_bag</span> For Buyers
                        </h3>
                        <div className="relative">
                            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-secondary/20"></div>
                            <div className="space-y-8 relative">
                                {buyerSteps.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-full bg-surface border-4 border-secondary/20 flex items-center justify-center relative z-10 shadow-sm text-secondary">
                                            <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                                        </div>
                                        <div className="bg-surface flex-1 p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                                            <h4 className="font-title-md font-bold text-on-surface">{step.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
