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

    // Sample fallbacks to guarantee Non-Drivable vehicles show if DB is empty
    const sampleProducts = [
        {
            id: 'sample-1',
            name: 'Mahindra 575 DI Tractor',
            price: '₹5,80,000',
            location: 'Rajkot, Gujarat',
            year: 2021,
            hours: '45 HP',
            condition: 'Used',
            category: 'Tractor',
            vehicleType: 'Drivable',
            isVerified: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
            seller: { phone: '+919023341592', whatsapp: '919023341592' }
        },
        {
            id: 'sample-2',
            name: 'Swaraj 744 FE Tractor',
            price: '₹6,20,000',
            location: 'Anand, Gujarat',
            year: 2022,
            hours: '48 HP',
            condition: 'Used',
            category: 'Tractor',
            vehicleType: 'Drivable',
            isVerified: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
            seller: { phone: '+919023341592', whatsapp: '919023341592' }
        },
        {
            id: 'sample-3',
            name: 'Shaktiman Semi Champion Rotavator',
            price: '₹1,15,000',
            location: 'Junagadh, Gujarat',
            year: 2023,
            hours: '7 Feet Width',
            condition: 'New',
            category: 'Rotavator',
            vehicleType: 'Non-Drivable',
            isVerified: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
            seller: { phone: '+919023341592', whatsapp: '919023341592' }
        },
        {
            id: 'sample-4',
            name: 'Fieldking Heavy Duty Disc Harrow',
            price: '₹85,000',
            location: 'Mehsana, Gujarat',
            year: 2022,
            hours: '14 Discs',
            condition: 'Used',
            category: 'Cultivator',
            vehicleType: 'Non-Drivable',
            isVerified: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
            seller: { phone: '+919023341592', whatsapp: '919023341592' }
        },
        {
            id: 'sample-5',
            name: 'Hydraulic Tipping Tractor Trolley (5 Ton)',
            price: '₹1,45,000',
            location: 'Bhavnagar, Gujarat',
            year: 2023,
            hours: 'Heavy Chassis',
            condition: 'Used',
            category: 'Trolley',
            vehicleType: 'Non-Drivable',
            isVerified: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
            seller: { phone: '+919023341592', whatsapp: '919023341592' }
        }
    ];

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
                        setProducts(sampleProducts);
                    }
                } else {
                    setProducts(sampleProducts);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts(sampleProducts);
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
            {/* Header Title Section */}
            <div className="bg-surface border-b border-outline-variant/30 py-8 sm:py-12 mb-8 sm:mb-12">
                <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-3 border border-primary/20">
                        <span className="material-symbols-outlined text-sm">agriculture</span> Limbani Agro Marketplace
                    </div>
                    <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-3">
                        Equipment Page
                    </h1>
                    <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-6 text-sm sm:text-base font-medium">
                        Browse verified drivable tractors, harvesters, non-drivable implements, and agricultural tools.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-surface-container rounded-2xl flex items-center px-4 border border-outline-variant/40 focus-within:border-primary shadow-sm transition-all">
                            <span className="material-symbols-outlined text-primary text-xl">search</span>
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-sm sm:text-base text-on-surface ml-2 py-3 sm:py-3.5 outline-none font-medium"
                                placeholder="Search tractors, harvesters, plows, or machinery..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-on-surface-variant hover:text-on-surface text-xs font-bold px-2">
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
