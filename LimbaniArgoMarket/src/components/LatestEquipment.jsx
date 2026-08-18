import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EquipmentCard from './EquipmentCard';
import { useData } from '../context/DataProvider';

const LatestEquipment = () => {
    const dataCtx = useData() || {};
    const getAllProduct = dataCtx.getAllProduct;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatest = async () => {
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
                            isVerified: true,
                            isFeatured: true,
                            image: (item.images && item.images.length > 0) ? item.images[0] : (item.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"),
                            seller: {
                                phone: item.phone || item.sellerPhone || '+919023341592',
                                whatsapp: item.whatsapp || item.phone || '919023341592'
                            }
                        }));
                        // Fetch & limit to top 4 latest equipment items
                        setProducts(normalized.slice(-4).reverse());
                    }
                }
            } catch (err) {
                console.error("LatestEquipment fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatest();
    }, []);

    return (
        <section className="py-8 sm:py-12 md:py-16 bg-surface-bright border-y border-outline-variant/20">
            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                <div className="flex flex-wrap justify-between items-start sm:items-end mb-6 md:mb-8 gap-3">
                    <div>
                        <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface">Latest Equipment</h2>
                        <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-1 font-medium">Recently added machinery from verified sellers.</p>
                    </div>
                    <Link
                        to="/equipments"
                        className="font-label-md text-xs sm:text-sm text-primary font-bold hover:bg-primary/10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-primary/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 active:scale-95 shadow-sm"
                    >
                        <span>View All Equipment</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-64 bg-surface-container rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                            {products.map(eq => (
                                <EquipmentCard key={eq.id} equipment={eq} />
                            ))}
                        </div>

                        <div className="mt-8 sm:mt-10 text-center">
                            <Link
                                to="/equipments"
                                className="px-6 py-3 bg-primary text-on-primary hover:bg-primary/90 font-bold text-xs sm:text-sm md:text-base rounded-xl transition-all inline-flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                            >
                                <span>View All Premium Equipment</span>
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow">
                        <span className="material-symbols-outlined text-5xl text-outline mb-2">agriculture</span>
                        <p className="text-on-surface-variant font-bold">No equipment listings added yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestEquipment;
