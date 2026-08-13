import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';
import axios from 'axios';

const DealerDetails = () => {
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';
    const [fetchedDealer, setFetchedDealer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDealer = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/user/get-all-dealer`);
                if (res.data && Array.isArray(res.data)) {
                    const match = res.data.find(d => (d._id === id || d.id === parseInt(id)));
                    if (match) setFetchedDealer(match);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDealer();
        else setLoading(false);
    }, [id]);

    const getDisplayAddress = (addr) => {
        if (!addr) return "Gujarat, India";
        if (typeof addr === 'string') return addr;
        if (typeof addr === 'object') {
            return [addr.address, addr.city, addr.state].filter(Boolean).join(', ') || addr.city || "Gujarat, India";
        }
        return "Gujarat, India";
    };

    const item = fetchedDealer || {};
    const displayAddress = getDisplayAddress(item.address || item.location);

    const dealer = {
        ...item,
        id: item._id || item.id || id,
        name: item.name || item.contactPerson || "Verified Dealer",
        coverimg: item.coverimg || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        profileimg: item.profileimg || item.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
        image: item.profileimg || item.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
        phone: item.phone || "+91 90233 41592",
        whatsapp: item.whatsapp || item.phone || "919023341592",
        address: displayAddress,
        description: item.description || "Authorized dealer on Limbani Agro Market.",
        hours: item.hours || "Mon - Sat: 9:00 AM - 7:30 PM",
        gstin: item.gstin || "24AAACL1234F1Z8",
        languages: Array.isArray(item.languages) ? item.languages : [item.languages || "Gujarati, Hindi, English"],
        serviceAreas: Array.isArray(item.serviceAreas) ? item.serviceAreas : [item.serviceAreas || "Gujarat, India"],
        faqs: item.faqs || [],
        gallery: item.gallery || [],
        whyChooseUs: item.whyChooseUs || [],
        achievements: item.achievements || [],
        authorizedBrands: item.authorizedBrands || [],
        services: item.services || [],
        reviews: item.reviews || [],
        stats: {
            equipmentListed: item.stats?.equipmentListed || item.totalListed || "15+",
            equipmentSold: item.stats?.equipmentSold || item.totalSold || "10+",
            avgRating: item.stats?.avgRating || item.rating || "4.9 ★",
            yearsExperience: item.stats?.yearsExperience || item.yearsInBusiness || "5 Yrs",
            teamMembers: item.stats?.teamMembers || "8+",
            statesServed: item.stats?.statesServed || "3"
        }
    };

    // Interactive states
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeFaq, setActiveFaq] = useState(null);
    const [copiedContact, setCopiedContact] = useState(false);

    // Filter inventory
    const dealerInventory = dealer?.inventory || [];
    const filteredInventory = selectedCategory === 'All'
        ? dealerInventory
        : dealerInventory.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());

    // Filter inventory & fetch dealer products from database
    const [dealerProducts, setDealerProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const res = await axios.get(`${API_URL}/api/product/get-all-product`);
                const allProds = res.data?.products || (Array.isArray(res.data) ? res.data : []);

                // Filter products listed by this dealer
                const matched = allProds.filter(p => {
                    const sId = p.sellerId?._id || p.sellerId || p.seller?._id || p.seller;
                    const dId = fetchedDealer?._id || fetchedDealer?.id || id;
                    const dName = fetchedDealer?.name || fetchedDealer?.contactPerson;

                    return (
                        (dId && String(sId) === String(dId)) ||
                        (dName && (p.seller === dName || p.sellerName === dName))
                    );
                });

                // Normalize for EquipmentCard
                const normalized = matched.map((p, idx) => ({
                    ...p,
                    id: p._id || p.id || idx + 1,
                    name: p.title || p.productName || p.name || "Agricultural Equipment",
                    price: p.price ? `₹${Number(p.price).toLocaleString('en-IN')}` : "₹ Contact Dealer",
                    image: p.images?.[0] || p.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
                    location: p.address || p.location || displayAddress,
                    year: p.manufactureYear || p.year || "2022",
                    condition: p.condition || "Used",
                    seller: {
                        phone: dealer.phone,
                        whatsapp: dealer.whatsapp
                    }
                }));

                setDealerProducts(normalized);
            } catch (err) {
                console.error("Dealer products error:", err);
            } finally {
                setLoadingProducts(false);
            }
        };

        if (id) fetchProducts();
    }, [id, fetchedDealer]);

    const handleCopyContact = () => {
        navigator.clipboard.writeText(`${dealer.name}\nPhone: ${dealer.phone}\nAddress: ${dealer.address}`);
        setCopiedContact(true);
        setTimeout(() => setCopiedContact(false), 2000);
    };

    if (loading) {
        return (
            <main className="w-full pt-[76px] pb-20 min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                <p className="text-on-surface-variant font-medium">Loading dealer profile...</p>
            </main>
        );
    }

    if (!fetchedDealer) {
        return (
            <main className="w-full pt-[76px] pb-20 min-h-screen bg-background flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-outline mb-4">storefront</span>
                <h2 className="font-title-md text-2xl font-bold text-on-surface mb-2">Dealer Not Found</h2>
                <p className="text-on-surface-variant mb-6">The requested dealer profile does not exist.</p>
                <Link to="/dealers" className="bg-primary text-on-primary font-bold text-sm px-6 py-2.5 rounded-xl">
                    Back to Dealers
                </Link>
            </main>
        );
    }

    return (
        <main className="w-full pt-[76px] pb-16 bg-background">

            {/* Breadcrumb Bar */}
            <div className="bg-surface border-b border-outline-variant/20 py-3 mb-6">
                <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to="/dealers" className="hover:text-primary transition-colors">Dealers</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold truncate">{dealer.name}</span>
                    </nav>
                </div>
            </div>

            {/* SECTION 2: Dealer Hero Banner */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-10">
                <div className="relative rounded-3xl overflow-hidden card-shadow border border-outline-variant/30 bg-surface-container-lowest">

                    {/* Cover Background */}
                    <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden bg-surface-container">
                        <img
                            src={dealer.coverimg}
                            alt={dealer.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="bg-primary/90 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
                                <span className="material-symbols-outlined text-[14px]">verified</span> Verified Dealer
                            </span>
                        </div>
                    </div>

                    {/* Dealer Profile Bar Overlay */}
                    <div className="p-6 sm:p-8 md:p-10 relative">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-16 sm:-mt-20 md:-mt-24 mb-4">

                            {/* Logo & Info */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 relative z-10">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-surface p-2 shadow-xl border-2 border-primary/30 shrink-0 overflow-hidden">
                                    <img src={dealer.profileimg} alt={dealer.name} className="w-full h-full object-cover rounded-xl" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80"; }} />
                                </div>
                                <div className="space-y-1 sm:mb-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">
                                            {dealer.name}
                                        </h1>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-on-surface-variant font-medium">
                                        {dealer.rating && (
                                            <>
                                                <span className="flex items-center gap-1 font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded">
                                                    <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {dealer.rating}
                                                </span>
                                                <span>•</span>
                                            </>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span> {dealer.address}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2.5 w-full md:w-auto shrink-0">
                                <a
                                    href={`tel:${dealer.phone}`}
                                    className="flex-1 sm:flex-initial bg-primary text-on-primary font-bold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">call</span> Call Dealer
                                </a>
                                <a
                                    href={`https://wa.me/${dealer.whatsapp}?text=Hi, I found your dealership on Limbani Agro Market.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 sm:flex-initial bg-[#25D366] text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-[#128C7E] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> WhatsApp
                                </a>
                                <button
                                    onClick={handleCopyContact}
                                    className="bg-surface-container border border-outline-variant text-on-surface font-bold text-sm px-4 py-3 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">share</span> {copiedContact ? 'Copied!' : 'Share'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>



            {/* SECTIONS 4 & 5: Overview + Contact Info */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Dealer Overview (7 cols) */}
                    <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-2">
                                <span className="material-symbols-outlined text-[18px]">store</span> About Dealership
                            </div>
                            <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface mb-3">Welcome to {dealer.name}</h2>
                            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed font-normal">
                                {dealer.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-outline-variant/20 py-4 text-xs sm:text-sm">
                            <div>
                                <span className="text-on-surface-variant font-medium block">Working Hours</span>
                                <span className="font-bold text-on-surface">{dealer.hours}</span>
                            </div>
                            <div>
                                <span className="text-on-surface-variant font-medium block">GST Registration</span>
                                <span className="font-bold text-primary">{dealer.gstin}</span>
                            </div>
                            <div>
                                <span className="text-on-surface-variant font-medium block">Languages Spoken</span>
                                <span className="font-bold text-on-surface">{Array.isArray(dealer.languages) ? dealer.languages.join(', ') : dealer.languages}</span>
                            </div>
                            <div>
                                <span className="text-on-surface-variant font-medium block">Service Coverage</span>
                                <span className="font-bold text-on-surface">{Array.isArray(dealer.serviceAreas) ? dealer.serviceAreas.join(', ') : dealer.serviceAreas}</span>
                            </div>
                        </div>
                    </div>

                    {/* Direct Contact Info (5 cols) */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-secondary font-bold text-xs sm:text-sm mb-2">
                                <span className="material-symbols-outlined text-[16px]">contact_phone</span> Contact Showroom
                            </div>
                            <h2 className="font-display-md text-2xl font-bold text-on-surface mb-4">Direct Contact Info</h2>

                            <div className="space-y-4 text-xs sm:text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">person</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Contact Person</span>
                                        <span className="font-bold text-on-surface">{dealer.name}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">call</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Phone Hotline</span>
                                        <a href={`tel:${dealer.phone}`} className="font-bold text-primary hover:underline">{dealer.phone}</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">location_on</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Showroom Address</span>
                                        <span className="font-bold text-on-surface leading-snug block">{dealer.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Directions Button */}
                        <div className="pt-4 border-t border-outline-variant/20 flex gap-2">
                            <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(dealer.address)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm py-3 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">directions</span> Directions
                            </a>
                            <button
                                onClick={handleCopyContact}
                                className="bg-primary-container text-on-primary font-bold text-xs sm:text-sm px-4 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">content_copy</span> Copy
                            </button>
                        </div>
                    </div>

                </div>
            </section>
            {/* SECTION 3: Dealer's Listed Equipment / Products */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-10 sm:mb-14">
                <div className="flex items-center justify-between gap-4 mb-6 border-b border-outline-variant/30 pb-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-1 border border-primary/20">
                            <span className="material-symbols-outlined text-sm">inventory_2</span> Dealer Inventory
                        </div>
                        <h2 className="font-display-md text-2xl sm:text-3xl font-extrabold text-on-surface flex items-center gap-2">
                            <span>Listed Products / Equipment</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-bold">
                                ({dealerProducts.length})
                            </span>
                        </h2>
                    </div>
                </div>

                {loadingProducts ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-56 bg-surface-container rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : dealerProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                        {dealerProducts.map(item => (
                            <EquipmentCard key={item.id} equipment={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow">
                        <span className="material-symbols-outlined text-5xl text-outline mb-2">agriculture</span>
                        <p className="text-on-surface-variant font-bold text-base">No active equipment listings added by this dealer yet.</p>
                    </div>
                )}
            </section>

        </main>
    );
};

export default DealerDetails;
