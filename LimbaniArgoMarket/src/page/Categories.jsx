import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const drivableCategories = [
    { name: "Tractor", icon: "agriculture", from: "₹2.5 Lakhs", img: "/cat_tractor.png" },
    { name: "Combine Harvester", icon: "eco", from: "₹15.0 Lakhs", img: "/cat_harvester.png" },
    { name: "Mini Tractor", icon: "directions_car", from: "₹1.8 Lakhs", img: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80" },
    { name: "JCB & Earth Movers", icon: "construction", from: "₹8.0 Lakhs", img: "/cat_jcb.png" },
    { name: "Crop Sprayer Vehicle", icon: "water_drop", from: "₹3.2 Lakhs", img: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80" },
    { name: "Self Propelled Reaper", icon: "grass", from: "₹2.1 Lakhs", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
    { name: "Paddy Transplanter", icon: "yard", from: "₹1.9 Lakhs", img: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80" },
    { name: "Sugarcane Loader", icon: "precision_manufacturing", from: "₹4.5 Lakhs", img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80" }
];

const nonDrivableCategories = [
    { name: "Rotavator", icon: "settings", from: "₹45,000", img: "/cat_rotavator.png" },
    { name: "Cultivator & Harrow", icon: "grid_view", from: "₹35,000", img: "/cat_cultivator.png" },
    { name: "Plough & Subsoiler", icon: "hardware", from: "₹25,000", img: "/cat_plough.png" },
    { name: "Tractor Trolley & Trailer", icon: "local_shipping", from: "₹95,000", img: "/cat_trolley.png" },
    { name: "Thresher & Shredder", icon: "cyclone", from: "₹80,000", img: "/cat_thresher.png" },
    { name: "Seed Drill & Planter", icon: "grain", from: "₹40,000", img: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80" },
    { name: "Tractor Sprayer Tank", icon: "opacity", from: "₹30,000", img: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80" },
    { name: "Laser Land Leveler", icon: "straighten", from: "₹1.5 Lakhs", img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80" }
];

const Categories = () => {
    const { getAllProduct } = useData() || {};
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAllDrivable, setShowAllDrivable] = useState(false);
    const [showAllNonDrivable, setShowAllNonDrivable] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (getAllProduct) {
                    const data = await getAllProduct();
                    if (data && Array.isArray(data)) {
                        setAllProducts(data);
                    }
                }
            } catch (err) {
                console.error("Error fetching products for category counts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [getAllProduct]);

    const getRealCount = (categoryName) => {
        if (!allProducts || !Array.isArray(allProducts) || allProducts.length === 0) return 0;
        const targetKey = categoryName.toLowerCase().trim();
        const firstWord = targetKey.split(' ')[0];

        return allProducts.filter(item => {
            const cat = (item.category || item.vehicleType || item.title || item.productName || item.name || '').toLowerCase();
            return cat.includes(targetKey) || cat.includes(firstWord);
        }).length;
    };

    const visibleDrivable = showAllDrivable ? drivableCategories : drivableCategories.slice(0, 5);
    const visibleNonDrivable = showAllNonDrivable ? nonDrivableCategories : nonDrivableCategories.slice(0, 5);

    return (
        <main className="w-full pt-[72px]">
            {/* Hero Banner (UNCHANGED) */}
            <section className="relative w-full min-h-[350px] md:min-h-[500px] flex items-center justify-center overflow-hidden mb-10 md:mb-16">
                <div className="absolute inset-0 z-0">
                    <img alt="Cinematic farming landscape with modern equipment" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAopxn5Zb3qW4oFfQDyGrdfmw6GTuWdsp-ycKBkw68SnL_CZrUncAkJetQHMmpOzNvFjWfGhnJMxfDWM0HuSPB5xRdTd2EhRXBQkGhJ3VFSP8Nhx627PZe3SMmLtEM2f1_g1RGd4fZ7dZa35Cgr-_4Ek4U9y759CDUP9Dj5M9p1JS8rj7g4dhb8lrCrB_n4PF2OYyqYj32qGprjTyryHIu4AFU66rK20cdvqsC5JzZ9FS20S6ca195UTA" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col items-start text-white">
                    <nav className="flex items-center gap-2 text-sm text-white/80 mb-4 md:mb-6">
                        <Link className="hover:text-white transition-colors" to="/">Home</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="font-medium text-secondary">Categories</span>
                    </nav>
                    <h1 className="font-display-lg text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 max-w-3xl leading-tight text-white">Browse Farming Equipment Categories</h1>
                    <p className="text-sm sm:text-base md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl font-light">Explore a wide range of tractors, implements, and machinery from top brands and trusted dealers across India.</p>

                    {/* Advanced Search Bar */}
                    <div className="glass-panel p-3 rounded-2xl flex flex-col md:flex-row gap-3 w-full max-w-5xl card-shadow border-white/30 bg-white/10">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/70">search</span>
                            <input className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/70 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="Search equipment..." type="text" />
                        </div>
                        <div className="flex-1 relative md:border-l border-white/20 md:pl-3">
                            <span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 text-white/70 md:left-7">category</span>
                            <select className="w-full bg-white/20 md:bg-transparent border border-white/30 md:border-none text-white rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-secondary outline-none appearance-none cursor-pointer">
                                <option className="text-gray-900" value="">All Categories</option>
                                <option className="text-gray-900" value="tractors">Tractors</option>
                                <option className="text-gray-900" value="implements">Implements</option>
                                <option className="text-gray-900" value="harvesters">Harvesters</option>
                            </select>
                        </div>
                        <div className="flex-1 relative md:border-l border-white/20 md:pl-3">
                            <span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 text-white/70 md:left-7">location_on</span>
                            <select className="w-full bg-white/20 md:bg-transparent border border-white/30 md:border-none text-white rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-secondary outline-none appearance-none cursor-pointer">
                                <option className="text-gray-900" value="">All States</option>
                                <option className="text-gray-900" value="gujarat">Gujarat</option>
                                <option className="text-gray-900" value="punjab">Punjab</option>
                                <option className="text-gray-900" value="maharashtra">Maharashtra</option>
                            </select>
                        </div>
                        <button className="bg-secondary text-on-secondary-fixed px-6 py-3 rounded-xl font-medium hover:bg-secondary/90 transition-colors active:scale-95 text-base shadow-lg">Search</button>
                    </div>
                </div>
            </section>

            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop space-y-12 md:space-y-16 pb-16 md:pb-20">
                
                {/* 1. Drivable Vehicles Categories */}
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2 border border-primary/20">
                                <span className="material-symbols-outlined text-sm">agriculture</span> Self-Propelled Machinery
                            </div>
                            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
                                Drivable Vehicles Categories
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
                        {visibleDrivable.map((cat, idx) => {
                            const count = getRealCount(cat.name);
                            return (
                                <Link key={idx} to={`/category/${encodeURIComponent(cat.name)}`} className="group bg-surface hover:bg-surface-container-high rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                    <div className="h-28 sm:h-36 md:h-40 overflow-hidden relative bg-surface-container">
                                        {cat.img ? (
                                            <img alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={cat.img} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary/40 group-hover:scale-105 transition-transform duration-500">
                                                <span className="material-symbols-outlined text-5xl md:text-6xl">{cat.icon}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur text-primary text-[11px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm border border-primary/20">
                                            {loading ? '...' : `${count} ${count === 1 ? 'Item' : 'Items'}`}
                                        </div>
                                    </div>
                                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-sm">{cat.icon}</span>
                                            <h3 className="font-title-md text-xs sm:text-sm md:text-base font-bold text-on-surface truncate">{cat.name}</h3>
                                        </div>
                                        <p className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant mt-auto pt-2 border-t border-outline-variant/20 flex justify-between">
                                            <span>From</span>
                                            <span className="font-bold text-primary">{cat.from}</span>
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {drivableCategories.length > 5 && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setShowAllDrivable(!showAllDrivable)}
                                className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                            >
                                <span>{showAllDrivable ? "Show Less" : "View More Drivable Categories"}</span>
                                <span className={`material-symbols-outlined text-base transition-transform duration-300 ${showAllDrivable ? "rotate-180" : ""}`}>
                                    expand_more
                                </span>
                            </button>
                        </div>
                    )}
                </section>

                {/* 2. Non - Drivable Vehicles Categories */}
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2 border border-primary/20">
                                <span className="material-symbols-outlined text-sm">construction</span> Implements & Attachments
                            </div>
                            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
                                Non - Drivable Vehicles Categories
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
                        {visibleNonDrivable.map((cat, idx) => {
                            const count = getRealCount(cat.name);
                            return (
                                <Link key={idx} to={`/category/${encodeURIComponent(cat.name)}`} className="group bg-surface hover:bg-surface-container-high rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                    <div className="h-28 sm:h-36 md:h-40 overflow-hidden relative bg-surface-container">
                                        {cat.img ? (
                                            <img alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={cat.img} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary/40 group-hover:scale-105 transition-transform duration-500">
                                                <span className="material-symbols-outlined text-5xl md:text-6xl">{cat.icon}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur text-primary text-[11px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm border border-primary/20">
                                            {loading ? '...' : `${count} ${count === 1 ? 'Item' : 'Items'}`}
                                        </div>
                                    </div>
                                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-sm">{cat.icon}</span>
                                            <h3 className="font-title-md text-xs sm:text-sm md:text-base font-bold text-on-surface truncate">{cat.name}</h3>
                                        </div>
                                        <p className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant mt-auto pt-2 border-t border-outline-variant/20 flex justify-between">
                                            <span>From</span>
                                            <span className="font-bold text-primary">{cat.from}</span>
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {nonDrivableCategories.length > 5 && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setShowAllNonDrivable(!showAllNonDrivable)}
                                className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                            >
                                <span>{showAllNonDrivable ? "Show Less" : "View More Non-Drivable Categories"}</span>
                                <span className={`material-symbols-outlined text-base transition-transform duration-300 ${showAllNonDrivable ? "rotate-180" : ""}`}>
                                    expand_more
                                </span>
                            </button>
                        </div>
                    )}
                </section>

                {/* 3. Fertilizer & Crop Care (Coming Soon) */}
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2 border border-amber-500/30">
                                <span className="material-symbols-outlined text-sm">schedule</span> Coming Soon
                            </div>
                            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
                                Fertilizer & Crop Care
                            </h2>
                            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1">
                                Organic fertilizers, soil enhancers, pesticides, and bio-nutrients for healthy crop yields.
                            </p>
                        </div>
                        <div className="px-5 py-2.5 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm rounded-xl border border-amber-500/30 text-center shrink-0">
                            Coming Soon
                        </div>
                    </div>
                </section>

                {/* 4. Farming Tools & Hardware (Coming Soon) */}
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2 border border-amber-500/30">
                                <span className="material-symbols-outlined text-sm">schedule</span> Coming Soon
                            </div>
                            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
                                Farming Tools & Hardware
                            </h2>
                            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1">
                                Hand tools, irrigation pipes, spare parts, electric water pumps, and fencing gear.
                            </p>
                        </div>
                        <div className="px-5 py-2.5 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm rounded-xl border border-amber-500/30 text-center shrink-0">
                            Coming Soon
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default Categories;
