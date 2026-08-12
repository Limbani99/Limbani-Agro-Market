import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EquipmentDetails = () => {
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';
    const [fetchedProduct, setFetchedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch product data using id
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/product/get-product-by-id/${id}`);
                if (res.data?.product) {
                    setFetchedProduct(res.data.product);
                }
            } catch (error) {
                console.log("Using sample fallback:", error?.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProductDetails();
        else setLoading(false);
    }, [id]);

    const item = fetchedProduct;

    // Safe normalized properties
    const equipment = {
        id: item?._id || item?.id || id,
        name: item?.title || item?.productName || item?.name || "Agricultural Machinery",
        price: typeof item?.price === 'number' ? `₹${item?.price.toLocaleString('en-IN')}` : (item?.price || 'Contact for Price'),
        location: [item?.district, item?.state].filter(Boolean).join(', ') || item?.address || item?.location || "Gujarat, India",
        year: item?.manufactureYear || item?.year || 2022,
        hours: item?.horsePower ? `${item?.horsePower} HP` : (item?.hours || item?.width || 'Standard'),
        condition: item?.condition || "Used",
        category: item?.category || "Machinery",
        description: item?.description || "High quality agricultural machinery verified on Limbani Agro Market.",
        isVerified: true,
        isFeatured: true,
        image: (item?.images && item?.images.length > 0) ? item?.images[0] : (item?.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"),
        gallery: (item?.images && item?.images.length > 0) ? item?.images : (item?.gallery || [item?.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"]),
        sellerName: item?.seller?.name || item?.sellerName || item?.seller || "Verified Farmer / Dealer",
        sellerPhone: item?.seller?.phone || item?.sellerPhone || item?.phone || "+919023341592",
        sellerWhatsapp: item?.seller?.whatsapp || item?.sellerPhone || item?.phone || "919023341592"
    };

    const [selectedImage, setSelectedImage] = useState(equipment.gallery ? equipment.gallery[0] : equipment.image);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (equipment) {
            setSelectedImage(equipment.gallery ? equipment.gallery[0] : equipment.image);
        }
    }, [fetchedProduct, id]);

    // Related equipment
    const relatedEquipments = [];

    if (loading) {
        return (
            <main className="w-full pt-[76px] pb-20 min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                <p className="text-on-surface-variant font-medium">Loading details...</p>
            </main>
        );
    }

    return (
        <main className="w-full pt-[76px] pb-20 min-h-screen bg-background">

            {/* Breadcrumb Navigation */}
            <div className="bg-surface border-b border-outline-variant/20 py-3.5 mb-6 md:mb-10">
                <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to="/equipments" className="hover:text-primary transition-colors">Equipments</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold truncate">{equipment.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">

                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 space-y-4">
                        {/* Hero Image */}
                        <div className="relative h-[300px] sm:h-[450px] md:h-[500px] bg-surface-container rounded-3xl overflow-hidden card-shadow border border-outline-variant/30 group">
                            <img
                                src={selectedImage}
                                alt={equipment.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"; }}
                            />
                            {equipment.isFeatured && (
                                <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-[16px]">star</span> Featured Machine
                                </div>
                            )}
                            <button
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={`absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-colors ${isBookmarked ? 'text-red-500 bg-white' : 'text-white hover:bg-white/40'}`}
                            >
                                <span className="material-symbols-outlined text-xl">{isBookmarked ? 'favorite' : 'favorite_border'}</span>
                            </button>
                        </div>

                        {/* Gallery Thumbnails */}
                        {equipment.gallery && equipment.gallery.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {equipment.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${selectedImage === img ? 'border-primary scale-95 ring-2 ring-primary/20' : 'border-outline-variant/30 opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=300&q=80"; }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Pricing & Seller Action */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Title & Badges */}
                        <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="px-3 py-1 bg-surface-container text-on-surface-variant font-bold text-xs rounded-full border border-outline-variant/40">
                                    {equipment.category}
                                </span>
                                {equipment.isVerified && (
                                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full border border-primary/20 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">verified</span> Verified Machine
                                    </span>
                                )}
                            </div>

                            <h1 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface leading-tight mb-3">
                                {equipment.name}
                            </h1>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-primary/80 text-[18px]">location_on</span>
                                <span className="font-medium">{equipment.location}</span>
                                <span>•</span>
                                <span className="text-secondary font-semibold">Posted Recently</span>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 card-shadow">
                            <div className="text-xs text-on-surface-variant font-medium mb-1">Asking Price</div>
                            <div className="flex items-baseline justify-between gap-2 mb-6">
                                <h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-primary">{equipment.price}</h2>
                                <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">Negotiable</span>
                            </div>

                            {/* Direct Action Buttons */}
                            <div className="space-y-3">
                                <a
                                    href={`tel:${equipment.sellerPhone}`}
                                    className="w-full bg-primary text-on-primary font-bold text-base py-3.5 px-6 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-center"
                                >
                                    <span className="material-symbols-outlined text-xl">call</span> Call Seller ({equipment.sellerPhone})
                                </a>

                                <a
                                    href={`https://wa.me/${equipment.sellerWhatsapp}?text=Hi, I am interested in your ${equipment.name} listed on Limbani Agro Market.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full bg-[#25D366] text-white font-bold text-base py-3.5 px-6 rounded-2xl hover:bg-[#128C7E] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-center"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 card-shadow">
                            <h3 className="font-title-md font-bold text-on-surface mb-3 flex items-center gap-2 text-sm sm:text-base">
                                <span className="material-symbols-outlined text-primary text-xl">person</span> Seller Details
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0">
                                    {(equipment.sellerName || 'V').charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-title-md font-bold text-on-surface truncate text-base">{equipment.sellerName}</h4>
                                        <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant">Verified Farmer / Dealer</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Machine Specifications Grid & Description */}
                <div className="space-y-12 mb-16">

                    {/* Key Specs Grid */}
                    <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                        <h3 className="font-title-lg text-xl sm:text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span> Machine Specifications
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                            <div className="bg-surface-container/50 p-4 rounded-2xl border border-outline-variant/20">
                                <span className="text-xs text-on-surface-variant block mb-1">Model Year</span>
                                <span className="font-title-md font-bold text-on-surface text-base sm:text-lg">{equipment.year}</span>
                            </div>

                            <div className="bg-surface-container/50 p-4 rounded-2xl border border-outline-variant/20">
                                <span className="text-xs text-on-surface-variant block mb-1">Usage / HP</span>
                                <span className="font-title-md font-bold text-on-surface text-base sm:text-lg">{equipment.hours}</span>
                            </div>

                            <div className="bg-surface-container/50 p-4 rounded-2xl border border-outline-variant/20">
                                <span className="text-xs text-on-surface-variant block mb-1">Condition</span>
                                <span className="font-title-md font-bold text-primary text-base sm:text-lg">{equipment.condition}</span>
                            </div>

                            <div className="bg-surface-container/50 p-4 rounded-2xl border border-outline-variant/20">
                                <span className="text-xs text-on-surface-variant block mb-1">Location</span>
                                <span className="font-title-md font-bold text-on-surface text-base sm:text-lg truncate block">{equipment.location}</span>
                            </div>
                        </div>
                    </section>

                    {/* Machine Description */}
                    <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow">
                        <h3 className="font-title-lg text-xl sm:text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">description</span> Detailed Description
                        </h3>
                        <p className="font-body-lg text-on-surface-variant leading-relaxed text-sm sm:text-base whitespace-pre-line">
                            {equipment.description}
                        </p>
                    </section>

                </div>

                {/* Related Equipments Grid */}
                {/* {relatedEquipments.length > 0 && (
                    <section>
                        <h3 className="font-title-lg text-2xl font-bold text-on-surface mb-6">Similar Machinery Options</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                            {relatedEquipments.map(eq => (
                                <EquipmentCard key={eq.id} equipment={eq} />
                            ))}
                        </div>
                    </section>
                )} */}

            </div>
        </main>
    );
};

export default EquipmentDetails;
