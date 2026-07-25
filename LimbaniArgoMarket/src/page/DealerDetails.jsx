import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dealersData } from '../data/dealersData';
import { equipmentsData } from '../data/equipmentsData';
import EquipmentCard from '../components/EquipmentCard';

const DealerDetails = () => {
    const { id } = useParams();
    
    // Find dealer by ID, fallback to first item
    const dealer = dealersData.find(d => d.id === parseInt(id)) || dealersData[0];
    
    // Interactive states
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeGalleryTab, setActiveGalleryTab] = useState(0);
    const [copiedContact, setCopiedContact] = useState(false);

    // Filter inventory
    const dealerInventory = equipmentsData; // Uses shared inventory list
    const filteredInventory = selectedCategory === 'All' 
        ? dealerInventory 
        : dealerInventory.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

    const handleCopyContact = () => {
        navigator.clipboard.writeText(`${dealer.name}\nPhone: ${dealer.phone}\nAddress: ${dealer.address}`);
        setCopiedContact(true);
        setTimeout(() => setCopiedContact(false), 2000);
    };

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
                            src={dealer.image} 
                            alt={dealer.name} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
                        
                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {dealer.isVerified && (
                                <span className="bg-primary/90 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-[14px]">verified</span> Verified Dealer
                                </span>
                            )}
                            {dealer.isPremium && (
                                <span className="bg-secondary text-on-secondary-fixed font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-[14px]">workspace_premium</span> Premium Showroom
                                </span>
                            )}
                            {dealer.isGstVerified && (
                                <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/30 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">fact_check</span> GST Registered
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Dealer Profile Bar Overlay */}
                    <div className="p-6 sm:p-8 md:p-10 relative">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-16 sm:-mt-20 md:-mt-24 mb-4">
                            
                            {/* Logo & Info */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 relative z-10">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-surface p-2 shadow-xl border-2 border-primary/30 shrink-0">
                                    <img src={dealer.logo} alt={dealer.name} className="w-full h-full object-contain rounded-xl" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface leading-tight">
                                        {dealer.name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-on-surface-variant font-medium">
                                        <span className="flex items-center gap-1 font-bold text-on-surface bg-surface-container px-2.5 py-0.5 rounded-md border border-outline-variant/30">
                                            <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {dealer.rating} ({dealer.reviewCount} Reviews)
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span> {dealer.city}, {dealer.state}
                                        </span>
                                        <span>•</span>
                                        <span>Est. {dealer.memberSince} ({dealer.yearsInBusiness} Yrs in Business)</span>
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

            {/* SECTION 5: Dealer Statistics */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">inventory_2</span>
                        </div>
                        <div className="font-display-lg text-xl sm:text-2xl font-extrabold text-primary">{dealer.stats.equipmentListed}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Equipment Listed</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">task_alt</span>
                        </div>
                        <div className="font-display-lg text-xl sm:text-2xl font-extrabold text-primary">{dealer.stats.equipmentSold}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Machinery Sold</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:-translate-y-1 hover:border-secondary/40 transition-all duration-300">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">star</span>
                        </div>
                        <div className="font-display-lg text-xl sm:text-2xl font-extrabold text-on-surface">{dealer.stats.avgRating}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Farmer Rating</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">history</span>
                        </div>
                        <div className="font-display-lg text-xl sm:text-2xl font-extrabold text-on-surface">{dealer.stats.yearsExperience}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Industry Experience</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">groups</span>
                        </div>
                        <div className="font-display-lg text-xl sm:text-2xl font-extrabold text-on-surface">{dealer.stats.teamMembers}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Expert Mechanics</div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">map</span>
                        </div>
                        <div className="font-display-lg text-xl sm:text-2xl font-extrabold text-on-surface">{dealer.stats.statesServed}</div>
                        <div className="text-xs text-on-surface-variant font-semibold mt-0.5">Delivery States</div>
                    </div>
                </div>
            </section>

            {/* SECTIONS 3 & 4: Overview + Contact Info (2 Columns) */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Dealer Overview (7 cols) */}
                    <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-3 border border-primary/20 font-bold">
                                <span className="material-symbols-outlined text-[16px]">info</span> About Showroom
                            </div>
                            <h2 className="font-display-md text-2xl font-bold text-on-surface mb-3">Dealer Overview</h2>
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
                                <span className="font-bold text-on-surface">{dealer.languages.join(', ')}</span>
                            </div>
                            <div>
                                <span className="text-on-surface-variant font-medium block">Service Coverage</span>
                                <span className="font-bold text-on-surface">{dealer.serviceAreas.join(', ')}</span>
                            </div>
                        </div>

                        {/* GST & Verification Badges */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-2 rounded-xl text-xs font-bold">
                                <span className="material-symbols-outlined text-[18px]">verified_user</span> 100% GST Registered Business
                            </div>
                            <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary px-3.5 py-2 rounded-xl text-xs font-bold">
                                <span className="material-symbols-outlined text-[18px]">workspace_premium</span> Verified Authorized Dealer
                            </div>
                        </div>
                    </div>

                    {/* Contact Card & Address (5 cols) */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-6 flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm mb-3 border border-secondary/20 font-bold">
                                <span className="material-symbols-outlined text-[16px]">contact_phone</span> Contact Showroom
                            </div>
                            <h2 className="font-display-md text-2xl font-bold text-on-surface mb-4">Direct Contact Info</h2>
                            
                            <div className="space-y-4 text-xs sm:text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">person</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Contact Person</span>
                                        <span className="font-bold text-on-surface">{dealer.contactPerson}</span>
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
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">mail</span>
                                    <div>
                                        <span className="text-on-surface-variant text-xs block">Official Email</span>
                                        <a href={`mailto:${dealer.email}`} className="font-bold text-on-surface hover:underline">{dealer.email}</a>
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
                                <span className="material-symbols-outlined text-[18px]">directions</span> Get Directions
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

            {/* SECTION 6: Equipment Inventory Grid */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-2 border border-primary/20 font-bold">
                            <span className="material-symbols-outlined text-[16px]">agriculture</span> Inventory
                        </div>
                        <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Available Equipment Stock</h2>
                        <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Explore verified tractors, rotavators & harvesters available at this showroom</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5 bg-surface-container p-1 rounded-2xl border border-outline-variant/30">
                        {['All', 'Tractors', 'Rotavator', 'Harvester'].map((cat, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {filteredInventory.map(eq => (
                        <EquipmentCard key={eq.id} equipment={eq} />
                    ))}
                </div>
            </section>

            {/* SECTION 7: Authorized Brands Available */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-16">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-2 border border-primary/20 font-bold">
                        <span className="material-symbols-outlined text-[16px]">verified</span> OEM Partners
                    </div>
                    <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Authorized Brands Stocked</h2>
                    <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Official sales & service partner for leading agricultural manufacturers</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                    {dealer.authorizedBrands.map((brand, idx) => (
                        <div key={idx} className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-xl">agriculture</span>
                            </div>
                            <h4 className="font-title-md font-bold text-on-surface text-xs sm:text-sm group-hover:text-primary transition-colors">{brand.name}</h4>
                            <span className="text-[10px] sm:text-[11px] text-on-surface-variant font-bold bg-surface-container px-2 py-0.5 rounded-full mt-1.5 border border-outline-variant/30">{brand.count} Units</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 8: Services Offered */}
            <section className="bg-surface-bright py-14 border-y border-outline-variant/20 mb-16">
                <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-3 border border-primary/20 font-bold">
                            <span className="material-symbols-outlined text-[16px]">build_circle</span> Services
                        </div>
                        <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Services Offered by Showroom</h2>
                        <p className="text-on-surface-variant text-sm">Comprehensive farmer support from pre-purchase to post-sales maintenance</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {dealer.services.map((service, idx) => (
                            <div key={idx} className="bg-surface p-4 sm:p-6 rounded-2xl border border-outline-variant/30 card-shadow hover:border-primary/50 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                                        <span className="material-symbols-outlined text-xl sm:text-2xl">{service.icon}</span>
                                    </div>
                                    <h3 className="font-title-md text-sm sm:text-base font-bold text-on-surface mb-1 sm:mb-2">{service.title}</h3>
                                    <p className="text-xs sm:text-sm text-on-surface-variant font-normal leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 9: Showroom Gallery */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-16">
                <div className="text-center mb-8">
                    <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Showroom & Workshop Gallery</h2>
                    <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Take a virtual tour of our Rajkot premises & equipment yard</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dealer.gallery.map((item, idx) => (
                        <div key={idx} className="relative h-56 rounded-2xl overflow-hidden card-shadow group border border-outline-variant/30">
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-3 left-3 text-white font-bold text-sm">
                                {item.title}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTIONS 13 & 14: Why Choose Us & Achievements */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Why Choose Us (7 cols) */}
                    <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-6">
                        <h2 className="font-display-md text-2xl font-bold text-on-surface">Why Farmers Trust This Dealer</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {dealer.whyChooseUs.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3.5 bg-surface rounded-2xl border border-outline-variant/20">
                                    <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-base">check_circle</span>
                                    </div>
                                    <div>
                                        <h4 className="font-title-md text-sm font-bold text-on-surface">{item.title}</h4>
                                        <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements & Awards (5 cols) */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-4">
                        <h2 className="font-display-md text-2xl font-bold text-on-surface mb-2">Awards & Certifications</h2>
                        <div className="space-y-3">
                            {dealer.achievements.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-surface border border-outline-variant/20 flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-xl">workspace_premium</span>
                                    </div>
                                    <div>
                                        <h4 className="font-title-md text-sm font-bold text-on-surface">{item.title}</h4>
                                        <p className="text-xs text-on-surface-variant">{item.org}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* SECTION 11: Customer Reviews */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-16">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm mb-2 border border-secondary/20 font-bold">
                        <span className="material-symbols-outlined text-[16px]">rate_review</span> Reviews
                    </div>
                    <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Verified Farmer Reviews</h2>
                    <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Real feedback from local farmers who purchased machinery here</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dealer.reviews.map((review, idx) => (
                        <div key={idx} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-secondary text-sm">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-on-surface-variant">{review.date}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-on-surface-variant italic mb-4 leading-relaxed">
                                    "{review.comment}"
                                </p>
                            </div>
                            <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-end">
                                <div>
                                    <h4 className="font-title-md text-sm font-bold text-on-surface">{review.name}</h4>
                                    <span className="text-xs text-on-surface-variant font-medium">{review.city}</span>
                                </div>
                                <span className="bg-primary/10 text-primary font-bold text-[11px] px-2 py-0.5 rounded-md">
                                    {review.equipment}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 15: Frequently Asked Questions */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-16">
                <div className="text-center mb-8">
                    <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Frequently Asked Questions</h2>
                    <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Common questions about tractor purchase, loans, and delivery</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {dealer.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden card-shadow">
                            <button 
                                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                className="w-full text-left p-4 sm:p-5 flex justify-between items-center font-bold text-sm sm:text-base text-on-surface cursor-pointer hover:text-primary transition-colors"
                            >
                                <span>{faq.q}</span>
                                <span className="material-symbols-outlined text-primary text-xl">
                                    {activeFaq === idx ? 'remove' : 'add'}
                                </span>
                            </button>
                            {activeFaq === idx && (
                                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant border-t border-outline-variant/20 leading-relaxed animate-[fadeIn_0.2s_ease-out]">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 17: Become a Dealer CTA */}
            <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop mb-12">
                <div className="bg-primary rounded-3xl p-8 sm:p-12 md:p-14 text-center card-shadow relative overflow-hidden text-white">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                        <span className="material-symbols-outlined text-4xl sm:text-5xl text-secondary">storefront</span>
                        <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-bold">
                            Own an Agricultural Equipment Business?
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base font-light">
                            Join Limbani Agro Market's verified dealer network and reach thousands of active farmers across India.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                            <Link to="/about" className="bg-secondary text-on-secondary-fixed font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl hover:bg-secondary/90 active:scale-95 transition-all shadow-lg">
                                Become a Verified Dealer
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default DealerDetails;
