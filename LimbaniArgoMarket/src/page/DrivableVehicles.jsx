import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';
import { useData } from '../context/DataProvider';

const DrivableVehicles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllProduct } = useData();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

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

    useEffect(() => {
        const fetchDrivable = async () => {
            try {
                if (getAllProduct) {
                    const data = await getAllProduct();
                    if (data && Array.isArray(data)) {
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

                        const drivableOnly = normalized.filter(item => !isItemNonDrivable(item));
                        setProducts(drivableOnly);
                    }
                }
            } catch (err) {
                console.error("DrivableVehicles fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivable();
    }, []);

    const filtered = products.filter(item =>
        (item.name || item.title || item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="w-full pt-[76px] pb-20 bg-surface dark:bg-surface-dim min-h-screen">
            {/* Breadcrumb Bar */}
            <div className="bg-surface-container/50 border-b border-outline-variant/20 py-2.5 mb-6">
                <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to="/equipments" className="hover:text-primary transition-colors">Equipment</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold">Drivable Vehicles</span>
                    </nav>

                    <Link
                        to="/equipments"
                        className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-on-primary border border-primary/20 hover:border-primary font-bold text-[10px] sm:text-xs transition-all duration-200 shadow-sm active:scale-95 shrink-0"
                    >
                        <span className="material-symbols-outlined text-xs sm:text-sm">arrow_back</span>
                        <span>Back to Equipment</span>
                    </Link>
                </div>
            </div>

            {/* Header Banner */}
            <div className="max-w-container-max mx-auto px-4 sm:px- margin-mobile md:px-margin-desktop mb-8">
                <div className="bg-gradient-to-r from-primary/90 via-primary to-primary/80 rounded-3xl p-6 sm:p-8 text-on-primary card-shadow relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-3 backdrop-blur-md border border-white/30">
                                <span className="material-symbols-outlined text-sm">minor_crash</span> Tractors, Harvesters & Earth Movers
                            </div>
                            <h1 className="font-display-lg text-2xl sm:text-4xl font-extrabold text-white mb-2">
                                Drivable Vehicles
                            </h1>
                            <p className="text-white/90 text-xs sm:text-sm max-w-xl font-medium">
                                Browse all available tractors, combines, harvesters, JCBs, and drivable agricultural vehicles across India.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-center shrink-0">
                            <span className="block text-2xl sm:text-3xl font-extrabold text-white">{products.length}</span>
                            <span className="text-[11px] sm:text-xs font-bold text-white/80 uppercase tracking-wider">Total Vehicles</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                {/* Search Bar */}
                <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow">
                    <div className="relative w-full sm:max-w-md">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input
                            type="text"
                            placeholder="Search by brand, tractor name, HP..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-surface-container/50 border border-outline-variant/30 rounded-xl text-xs sm:text-sm font-medium text-on-surface focus:outline-none focus:border-primary transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant hover:text-on-surface"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="text-xs font-bold text-on-surface-variant self-end sm:self-center">
                        Showing {filtered.length} of {products.length} Drivable Vehicles
                    </div>
                </div>

                {/* Grid or States */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-72 bg-surface-container rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                        {filtered.map(eq => (
                            <EquipmentCard key={eq.id} equipment={eq} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow">
                        <span className="material-symbols-outlined text-5xl text-outline mb-2">minor_crash</span>
                        <p className="text-on-surface font-bold text-base mb-1">No Drivable Vehicles Found</p>
                        <p className="text-on-surface-variant text-xs mb-4">Try searching with a different keyword or view all listings.</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary/90 transition-all"
                            >
                                Reset Search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default DrivableVehicles;
