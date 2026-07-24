import React from 'react';

const EquipmentCategories = () => {
    const categories = [
        "Tractor", "Mini Tractor", "Rotavator", "Cultivator", 
        "Plough", "Harvester", "Seeder", "Trailer", 
        "Sprayer", "Water Pump", "Power Tiller", "JCB", 
        "Loader", "Other Machinery"
    ];

    return (
        <section className="py-20 bg-surface border-y border-outline-variant/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-12">
                    <h2 className="font-display-md text-3xl font-bold text-on-surface mb-4">Equipment Categories</h2>
                    <p className="text-on-surface-variant">Everything you need for your farm, all in one place.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                    {categories.map((category, idx) => (
                        <div key={idx} className="bg-surface-container-lowest border border-outline-variant/50 px-6 py-3 rounded-full hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer card-shadow flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl text-primary/70">agriculture</span>
                            <span className="font-title-sm font-semibold">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EquipmentCategories;
