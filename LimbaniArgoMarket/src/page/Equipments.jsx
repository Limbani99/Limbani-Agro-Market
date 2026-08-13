import React, { useState, useEffect } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { useData } from '../context/DataProvider';

const Equipments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllProduct } = useData();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    // View More toggles for sections
    const [showAllDrivable, setShowAllDrivable] = useState(false);
    const [showAllNonDrivable, setShowAllNonDrivable] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (getAllProduct) {
                    const data = await getAllProduct();
                    if (data && Array.isArray(data) && data.length > 0) {
                        const normalized = data.map((item, index) => ({
                            ...item,
                            id: item._id || item.id || index + 1,
                            name: item.title || item.productName || item.name || "Agricultural Machinery",
                            price: typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : (item.price || 'Contact for Price'),
                            location: [item.district, item.state].filter(Boolean).join(', ') || item.address || item.location || "Gujarat, India",
                            year: item.manufactureYear || item.year || 2022,
                            hours: item.horsePower ? `${item.horsePower} HP` : (item.hours || item.width || 'Standard'),
                            condition: item.condition || "Used",
                            category: item.category || item.vehicleType || "Machinery",
                            vehicleType: item.vehicleType || (['Rotavator', 'Cultivator', 'Plow', 'Plough', 'Trolley', 'Thresher', 'Seed Drill', 'Sprayer', 'Baler', 'Reaper', 'Implement', 'Attachment'].includes(item.category) ? 'Non-Drivable' : 'Drivable'),
                            isVerified: true,
                            isFeatured: true,
                            image: (item.images && item.images.length > 0) ? item.images[0] : (item.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"),
                            seller: {
                                phone: item.phone || item.sellerPhone || '+919023341592',
                                whatsapp: item.whatsapp || item.phone || '919023341592'
                            }
                        }));
                        setProducts(normalized);
                    } else {
                        setProducts([]);
                    }
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    // Filter by search term
    const filteredEquipments = products.filter(equipment =>
        (equipment.name || equipment.title || equipment.productName || equipment.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Non-Drivable category keywords
    const nonDrivableKeywords = [
        'rotavator', 'cultivator', 'plow', 'plough', 'trolley', 'thresher',
        'seed drill', 'sprayer', 'baler', 'reaper', 'implement', 'attachment',
        'non-drivable', 'nondrivable', 'non drivable', 'leveler', 'chaff cutter',
        'harrow', 'subsoiler', 'mulcher', 'trailer', 'blade', 'tool', 'hardware'
    ];

    const isItemNonDrivable = (item) => {
        if (item.vehicleType === 'Non-Drivable' || item.isDrivable === false || item.isNonDrivable === true) return true;
        const cat = (item.category || item.vehicleType || item.type || item.productName || item.title || item.name || '').toLowerCase();
        return nonDrivableKeywords.some(keyword => cat.includes(keyword));
    };

    // Drivable & Non-Drivable Vehicle lists
    const drivableProducts = filteredEquipments.filter(item => !isItemNonDrivable(item));
    const nonDrivableProducts = filteredEquipments.filter(item => isItemNonDrivable(item));

    const visibleDrivable = showAllDrivable ? drivableProducts : drivableProducts.slice(0, 6);
    const visibleNonDrivable = showAllNonDrivable ? nonDrivableProducts : nonDrivableProducts.slice(0, 6);

    return (
        <main className="w-full pt-[72px] pb-20 min-h-screen bg-background">
            {/* Hero Section matching HomeHero Layout, Size & Colors */}
            <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] flex items-end lg:items-center justify-center pt-24 pb-8 sm:pb-12 lg:py-16 px-4 sm:px-margin-mobile md:px-margin-desktop overflow-hidden bg-[#15120D] mb-8 sm:mb-12 shadow-xl">
                
                {/* Background Image: Farmer & Family on Left */}
                <div
                    className="absolute inset-0 bg-cover bg-[position:left_center] md:bg-[position:20%_center] w-full h-full z-0 opacity-95 pointer-events-none"
                    style={{ backgroundImage: "url('/equipment_hero_bg.png')" }}
                ></div>

                {/* Gradient Overlays: Clear Left for Farmer Family, Dark on Right for High Contrast Text */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-black/90 hidden lg:block z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 lg:hidden z-10 pointer-events-none"></div>

                {/* Main Container */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end lg:items-center relative z-20 w-full">

                    {/* Left Space - Desktop */}
                    <div className="hidden lg:block lg:col-span-5 min-h-[280px]"></div>

                    {/* Content at Right Column */}
                    <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center mt-auto lg:mt-0 pb-1 sm:pb-0">

                        {/* Trust Tagline Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A438]/20 text-[#E8C468] font-bold text-[10px] sm:text-xs border border-[#D9A438]/30 shadow-md backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A438]"></span>
                            <span>India's #1 Agricultural Equipment Marketplace</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="font-display-lg text-center text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.22] tracking-tight drop-shadow-lg">
                            Discover & Buy{" "}
                            <span className="bg-gradient-to-r from-[#E8C468] via-[#D9A438] to-[#C4872A] bg-clip-text text-transparent">
                                Verified Farm Machinery
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="font-body-lg text-center text-[11px] sm:text-sm text-white/90 leading-relaxed font-normal max-w-xl mx-auto drop-shadow-md">
                            Explore top-quality tractors, harvesters, rotavators, implements, and farm tools directly from verified dealers across India. 0% hidden commission.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto pt-1">
                            <div className="bg-white/95 backdrop-blur-md rounded-xl flex items-center px-3.5 py-1 border border-white/30 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#D9A438]">
                                <span className="material-symbols-outlined text-[#D9A438] text-xl shrink-0">search</span>
                                <input
                                    className="w-full bg-transparent border-none focus:ring-0 text-xs sm:text-sm text-gray-900 ml-2 py-2 sm:py-2.5 outline-none font-medium placeholder-gray-500"
                                    placeholder="Search tractors, harvesters, rotavators, plows..."
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="text-gray-500 hover:text-gray-900 text-xs font-bold px-2 py-0.5 rounded-lg bg-gray-100 transition-colors shrink-0"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Quick Highlights */}
                        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 pt-1 text-[10px] sm:text-xs font-bold text-white/90 drop-shadow-md">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-[#E8C468]">verified</span> 100% Verified Sellers
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-[#E8C468]">storefront</span> Direct Dealer Contact
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-[#E8C468]">sell</span> Best Market Prices
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop space-y-12 sm:space-y-16">

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-on-surface-variant font-medium">Loading equipment inventory...</p>
                    </div>
                ) : (
                    <>
                        {/* 1. Drivable Vehicles Section */}
                        <section className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/20">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                                        <span className="material-symbols-outlined text-base">minor_crash</span> Tractors & Harvesters
                                    </div>
                                    <h2 className="font-display-lg text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface">
                                        Drivable Vehicles
                                    </h2>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold text-xs self-start sm:self-auto">
                                    {drivableProducts.length} Vehicles Available
                                </span>
                            </div>

                            {drivableProducts.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                                        {visibleDrivable.map(eq => (
                                            <EquipmentCard key={eq.id} equipment={eq} />
                                        ))}
                                    </div>

                                    {/* View More Button */}
                                    {drivableProducts.length > 6 && (
                                        <div className="text-center mt-8 pt-4 border-t border-outline-variant/20">
                                            <button
                                                onClick={() => setShowAllDrivable(!showAllDrivable)}
                                                className="px-6 py-2.5 rounded-xl bg-surface-container hover:bg-primary/10 border border-outline-variant/40 hover:border-primary/50 text-on-surface hover:text-primary font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer"
                                            >
                                                <span>{showAllDrivable ? 'Show Less' : `View More Drivable Vehicles (${drivableProducts.length - 6}+)`}</span>
                                                <span className="material-symbols-outlined text-lg">{showAllDrivable ? 'expand_less' : 'expand_more'}</span>
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-10 bg-surface-container rounded-2xl border border-outline-variant/20">
                                    <span className="material-symbols-outlined text-4xl text-outline mb-2">agriculture</span>
                                    <p className="text-on-surface-variant font-bold text-sm">No drivable vehicles found matching your search.</p>
                                </div>
                            )}
                        </section>

                        {/* 2. Non-Drivable Vehicles Section */}
                        <section className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/20">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary mb-1">
                                        <span className="material-symbols-outlined text-base">handyman</span> Implements & Attachments
                                    </div>
                                    <h2 className="font-display-lg text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface">
                                        Non - Drivable Vehicles
                                    </h2>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-bold text-xs self-start sm:self-auto">
                                    {nonDrivableProducts.length} Implements Available
                                </span>
                            </div>

                            {nonDrivableProducts.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                                        {visibleNonDrivable.map(eq => (
                                            <EquipmentCard key={eq.id} equipment={eq} />
                                        ))}
                                    </div>

                                    {/* View More Button */}
                                    {nonDrivableProducts.length > 6 && (
                                        <div className="text-center mt-8 pt-4 border-t border-outline-variant/20">
                                            <button
                                                onClick={() => setShowAllNonDrivable(!showAllNonDrivable)}
                                                className="px-6 py-2.5 rounded-xl bg-surface-container hover:bg-secondary/10 border border-outline-variant/40 hover:border-secondary/50 text-on-surface hover:text-secondary font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer"
                                            >
                                                <span>{showAllNonDrivable ? 'Show Less' : `View More Non-Drivable Vehicles (${nonDrivableProducts.length - 6}+)`}</span>
                                                <span className="material-symbols-outlined text-lg">{showAllNonDrivable ? 'expand_less' : 'expand_more'}</span>
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-10 bg-surface-container rounded-2xl border border-outline-variant/20">
                                    <span className="material-symbols-outlined text-4xl text-outline mb-2">construction</span>
                                    <p className="text-on-surface-variant font-bold text-sm">No non-drivable vehicles found matching your search.</p>
                                </div>
                            )}
                        </section>

                        {/* 3. Fertilizer & Crop Care Section (Coming Soon) */}
                        <section className="bg-surface-container-lowest p-6 sm:p-8 md:p-10 rounded-3xl border border-outline-variant/30 card-shadow relative overflow-hidden">
                            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/20">
                                <h2 className="font-display-lg text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500 text-2xl">eco</span>
                                    <span>Fertilizer & Crop Care</span>
                                </h2>
                            </div>

                            <div className="text-center py-8 sm:py-12 bg-surface-container/50 rounded-2xl border border-amber-500/20">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/30 shadow-sm">
                                    <span className="material-symbols-outlined text-3xl">compost</span>
                                </div>
                                <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs mb-3 border border-amber-500/30 tracking-widest uppercase">
                                    Coming Soon
                                </span>
                                <h3 className="font-display-md text-lg sm:text-xl font-bold text-on-surface mb-2">
                                    Organic Fertilizers, Soil Conditioners & Pest Control
                                </h3>
                                <p className="text-on-surface-variant text-xs sm:text-sm max-w-md mx-auto font-medium">
                                    We are partnering with certified agricultural manufacturers to bring fertilizers and crop care products to Limbani Agro Market.
                                </p>
                            </div>
                        </section>

                        {/* 4. Farming Tools & Hardware Section (Coming Soon) */}
                        <section className="bg-surface-container-lowest p-6 sm:p-8 md:p-10 rounded-3xl border border-outline-variant/30 card-shadow relative overflow-hidden">
                            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/20">
                                <h2 className="font-display-lg text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500 text-2xl">hardware</span>
                                    <span>Farming Tools & Hardware</span>
                                </h2>
                            </div>

                            <div className="text-center py-8 sm:py-12 bg-surface-container/50 rounded-2xl border border-blue-500/20">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4 border border-blue-500/30 shadow-sm">
                                    <span className="material-symbols-outlined text-3xl">build</span>
                                </div>
                                <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-xs mb-3 border border-blue-500/30 tracking-widest uppercase">
                                    Coming Soon
                                </span>
                                <h3 className="font-display-md text-lg sm:text-xl font-bold text-on-surface mb-2">
                                    Hand Tools, Pumps, Motors & Spare Parts
                                </h3>
                                <p className="text-on-surface-variant text-xs sm:text-sm max-w-md mx-auto font-medium">
                                    Essential farming hardware, irrigation pumps, and machinery spare parts arriving soon.
                                </p>
                            </div>
                        </section>
                    </>
                )}

            </div>
        </main>
    );
};

export default Equipments;
