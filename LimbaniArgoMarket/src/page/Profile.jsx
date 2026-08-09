import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import { equipmentsData } from '../data/equipmentsData';
import EquipmentCard from '../components/EquipmentCard';

const Profile = () => {
    const { userData, logout } = useData();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedContact, setCopiedContact] = useState(false);

    // Profile details fallback to Kisan Tractors & Implements
    const profileDetails = {
        name: userData?.name || "Kisan Tractors & Implements",
        logo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=120&q=80",
        coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        rating: "4.8",
        reviewCount: 198,
        isVerified: true,
        isGstVerified: true,
        yearsInBusiness: 8,
        city: userData?.city || "Pune",
        state: userData?.state || "Maharashtra",
        address: userData?.address || "Pune-Satara Highway, Katraj, Pune, Maharashtra 411046",
        contactPerson: userData?.contactPerson || userData?.name || "Sanjay Deshmukh (Managing Director)",
        phone: userData?.phone || "+91 98220 11223",
        whatsapp: userData?.phone ? userData.phone.replace(/[^0-9]/g, '') : "919822011223",
        email: userData?.email || "info@kisantractors.com",
        gstin: "27BBBDE4321K1Z3",
        hours: "Mon - Sat: 9:30 AM - 7:00 PM",
        languages: "Marathi, Hindi, English",
        serviceAreas: "Pune, Satara, Solapur, Kolhapur",
        description: userData?.description || "Kisan Tractors & Implements is Maharashtra's premier authorized dealership for Mahindra, Swaraj, and Massey Ferguson tractors. We specialize in grape garden mini tractors, rotavators, harvesters, and high-efficiency agricultural implements with full after-sales support.",
        stats: {
            equipmentListed: "950+",
            equipmentSold: "780+",
            avgRating: "4.8 ★",
            yearsExperience: "8 Yrs"
        },
        authorizedBrands: [
            { name: "Mahindra", count: "180 Units" },
            { name: "Swaraj", count: "140 Units" },
            { name: "Massey Ferguson", count: "120 Units" },
            { name: "John Deere", count: "85 Units" }
        ]
    };

    // Inventory filtering
    const inventory = equipmentsData;
    const filteredInventory = selectedCategory === 'All'
        ? inventory
        : inventory.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

    const handleCopyContact = () => {
        navigator.clipboard.writeText(`${profileDetails.name}\nPhone: ${profileDetails.phone}\nAddress: ${profileDetails.address}`);
        setCopiedContact(true);
        setTimeout(() => setCopiedContact(false), 2000);
    };

    return (
        <main className="w-full pt-[76px] pb-16 bg-surface dark:bg-surface-dim min-h-screen">
            
            {/* Breadcrumb Bar */}
            <div className="bg-surface-container/50 border-b border-outline-variant/20 py-2.5 mb-6">
                <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold truncate">My Profile</span>
                    </nav>
                </div>
            </div>

            {/* HERO BANNER SECTION */}
            <section className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="relative rounded-3xl overflow-hidden card-shadow border border-outline-variant/30 bg-surface-container-lowest">
                    
                    {/* Cover Background */}
                    <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden bg-surface-container">
                        <img 
                            src={profileDetails.coverImage} 
                            alt={profileDetails.name} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
                        
                        {/* Top Verification Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {profileDetails.isVerified && (
                                <span className="bg-primary/90 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-[14px]">verified</span> Verified Dealer
                                </span>
                            )}
                            {profileDetails.isGstVerified && (
                                <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/30 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">fact_check</span> GST Registered
                                </span>
                            )}
                        </div>

                        {/* Top Right Logout Button */}
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={logout}
                                className="bg-error/80 hover:bg-error text-white font-bold text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[16px]">logout</span> Log Out
                            </button>
                        </div>
                    </div>

                    {/* Profile Header Overlay */}
                    <div className="p-6 sm:p-8 relative">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-16 sm:-mt-20 md:-mt-22 mb-2">
                            
                            {/* Logo & Basic Info */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 relative z-10">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface p-2 shadow-xl border-2 border-primary/30 shrink-0">
                                    {userData?.name ? (
                                        <div className="w-full h-full rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-3xl shadow-sm">
                                            {userData.name.charAt(0).toUpperCase()}
                                        </div>
                                    ) : (
                                        <img src={profileDetails.logo} alt={profileDetails.name} className="w-full h-full object-contain rounded-xl" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                                        {profileDetails.name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-on-surface-variant font-medium">
                                        <span className="flex items-center gap-1 font-bold text-on-surface bg-surface-container px-2.5 py-0.5 rounded-md border border-outline-variant/30">
                                            <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {profileDetails.rating} ({profileDetails.reviewCount} Reviews)
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span> {profileDetails.city}, {profileDetails.state}
                                        </span>
                                        <span>•</span>
                                        <span>Est. {profileDetails.yearsInBusiness} Yrs in Business</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Action Buttons */}
                            <div className="flex flex-wrap gap-2.5 w-full md:w-auto shrink-0">
                                <a 
                                    href={`tel:${profileDetails.phone}`} 
                                    className="flex-1 sm:flex-initial bg-primary text-on-primary font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">call</span> Call Dealer
                                </a>
                                <a 
                                    href={`https://wa.me/${profileDetails.whatsapp}?text=Hi, I found your profile on Limbani Agro Market.`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex-1 sm:flex-initial bg-[#25D366] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#128C7E] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">chat</span> WhatsApp
                                </a>
                                <button 
                                    onClick={handleCopyContact} 
                                    className="bg-surface-container border border-outline-variant text-on-surface font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">share</span> {copiedContact ? 'Copied!' : 'Share'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* KEY STATS ROW */}
            <section className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center">
                        <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">inventory_2</span>
                        </div>
                        <div className="font-display-lg text-xl font-extrabold text-primary">{profileDetails.stats.equipmentListed}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Equipment Listed</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center">
                        <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">task_alt</span>
                        </div>
                        <div className="font-display-lg text-xl font-extrabold text-primary">{profileDetails.stats.equipmentSold}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Machinery Sold</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center">
                        <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">star</span>
                        </div>
                        <div className="font-display-lg text-xl font-extrabold text-on-surface">{profileDetails.stats.avgRating}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Farmer Rating</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center">
                        <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">history</span>
                        </div>
                        <div className="font-display-lg text-xl font-extrabold text-on-surface">{profileDetails.stats.yearsExperience}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Experience</div>
                    </div>
                </div>
            </section>

            {/* NECESSARY DETAILS GRID (2 COLUMNS) */}
            <section className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: Dealership Overview & Brands */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Overview Card */}
                        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow space-y-4">
                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                <span className="material-symbols-outlined text-[20px]">info</span> About Dealership
                            </div>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                {profileDetails.description}
                            </p>

                            {/* Business Info Table */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-outline-variant/20 pt-4 text-xs sm:text-sm">
                                <div>
                                    <span className="text-on-surface-variant font-medium block">Working Hours</span>
                                    <span className="font-bold text-on-surface">{profileDetails.hours}</span>
                                </div>
                                <div>
                                    <span className="text-on-surface-variant font-medium block">GST Registration</span>
                                    <span className="font-bold text-primary">{profileDetails.gstin}</span>
                                </div>
                                <div>
                                    <span className="text-on-surface-variant font-medium block">Languages Spoken</span>
                                    <span className="font-bold text-on-surface">{profileDetails.languages}</span>
                                </div>
                                <div>
                                    <span className="text-on-surface-variant font-medium block">Service Coverage</span>
                                    <span className="font-bold text-on-surface">{profileDetails.serviceAreas}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stocked OEM Brands */}
                        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow">
                            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                                <span className="material-symbols-outlined text-[20px]">verified</span> Authorized Brands Stocked
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {profileDetails.authorizedBrands.map((brand, idx) => (
                                    <div key={idx} className="bg-surface p-3.5 rounded-2xl border border-outline-variant/30 text-center">
                                        <h4 className="font-bold text-xs sm:text-sm text-on-surface">{brand.name}</h4>
                                        <span className="text-[11px] text-primary font-semibold">{brand.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Direct Contact & Location */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-4">
                                <span className="material-symbols-outlined text-[20px]">contact_phone</span> Direct Contact Information
                            </div>
                            
                            <div className="space-y-4 text-xs sm:text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">person</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Contact Person</span>
                                        <span className="font-bold text-on-surface">{profileDetails.contactPerson}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">call</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Phone Hotline</span>
                                        <a href={`tel:${profileDetails.phone}`} className="font-bold text-primary hover:underline">{profileDetails.phone}</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">mail</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Official Email</span>
                                        <a href={`mailto:${profileDetails.email}`} className="font-bold text-on-surface hover:underline">{profileDetails.email}</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">location_on</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Showroom Address</span>
                                        <span className="font-bold text-on-surface leading-snug block">{profileDetails.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Directions Button */}
                        <div className="pt-4 border-t border-outline-variant/20 flex gap-2">
                            <a 
                                href={`https://maps.google.com/?q=${encodeURIComponent(profileDetails.address)}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm py-2.5 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">directions</span> Get Directions
                            </a>
                            <button 
                                onClick={handleCopyContact}
                                className="bg-primary-container text-on-primary font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">content_copy</span> Copy
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* EQUIPMENT INVENTORY SECTION */}
            <section className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="font-display-md text-xl sm:text-2xl font-bold text-on-surface">Available Equipment Stock</h2>
                        <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5">Verified tractors & machinery available at showroom</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5 bg-surface-container p-1 rounded-2xl border border-outline-variant/30">
                        {['All', 'Tractors', 'Rotavator', 'Harvester'].map((cat, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {filteredInventory.map(eq => (
                        <EquipmentCard key={eq.id} equipment={eq} />
                    ))}
                </div>
            </section>

        </main>
    );
};

export default Profile;
