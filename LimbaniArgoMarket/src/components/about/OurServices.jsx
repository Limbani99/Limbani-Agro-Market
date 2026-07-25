import React from 'react';

const OurServices = () => {
    const services = [
        { title: "Buy Used Equipment", icon: "shopping_cart", color: "text-blue-600 bg-blue-100" },
        { title: "Sell Equipment", icon: "sell", color: "text-green-600 bg-green-100" },
        { title: "Dealer Marketplace", icon: "storefront", color: "text-purple-600 bg-purple-100" },
        { title: "Custom Farm Work", icon: "handyman", color: "text-orange-600 bg-orange-100" },
        { title: "Equipment Rental", icon: "car_rental", color: "text-teal-600 bg-teal-100" },
        { title: "Featured Advertisements", icon: "campaign", color: "text-pink-600 bg-pink-100" },
        { title: "Dealer Subscription", icon: "card_membership", color: "text-indigo-600 bg-indigo-100" },
        { title: "Business Promotion", icon: "trending_up", color: "text-red-600 bg-red-100" }
    ];

    return (
        <section className="py-20 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-4">Our Premium Services</h2>
                    <p className="text-on-surface-variant text-lg">A complete ecosystem designed to support every aspect of the agricultural supply chain.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-surface p-3.5 sm:p-6 rounded-2xl border border-outline-variant/30 card-shadow hover:border-primary/50 hover:shadow-lg active:scale-95 transition-all group cursor-pointer flex flex-col justify-between">
                            <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                                <span className="material-symbols-outlined text-xl sm:text-3xl">{service.icon}</span>
                            </div>
                            <h3 className="font-title-md text-xs sm:text-lg font-bold text-on-surface mb-1 sm:mb-2">{service.title}</h3>
                            <div className="w-6 sm:w-8 h-1 bg-outline-variant/50 rounded-full group-hover:bg-primary transition-colors mt-2 sm:mt-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
