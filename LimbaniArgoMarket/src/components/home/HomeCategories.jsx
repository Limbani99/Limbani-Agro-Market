import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';

const HomeCategories = () => {
    const dataCtx = useData() || {};
    const getAllProduct = dataCtx.getAllProduct;

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { name: "Tractor", searchKey: "Tractor", img: "/cat_tractor.png", icon: "agriculture" },
        { name: "Rotavator", searchKey: "Rotavator", img: "/cat_rotavator.png", icon: "settings" },
        { name: "Cultivator", searchKey: "Cultivator", img: "/cat_cultivator.png", icon: "grid_view" },
        { name: "Plough", searchKey: "Plow", img: "/cat_plough.png", icon: "hardware" },
        { name: "Harvester", searchKey: "Harvester", img: "/cat_harvester.png", icon: "eco" },
        { name: "Trolley", searchKey: "Trolley", img: "/cat_trolley.png", icon: "local_shipping" }
    ];

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
                console.error("Error fetching products for HomeCategories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [getAllProduct]);

    const getRealCount = (catName, key) => {
        if (!allProducts || !Array.isArray(allProducts) || allProducts.length === 0) return 0;
        const target = catName.toLowerCase().trim();
        const fallbackKey = (key || '').toLowerCase().trim();

        return allProducts.filter(item => {
            const categoryText = (item.category || item.vehicleType || item.title || item.productName || item.name || '').toLowerCase();
            return categoryText.includes(target) || (fallbackKey && categoryText.includes(fallbackKey));
        }).length;
    };

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-3 md:mb-4 border border-primary/20 font-extrabold text-xs">
                            <span className="material-symbols-outlined text-[16px]">category</span>
                            <span>Categories</span>
                        </div>
                        <h2 className="font-display-md text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface mb-2 md:mb-3">
                            Browse by Equipment Type
                        </h2>
                        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant font-medium">
                            Find the exact machinery you need for your farm quickly and easily. Browse verified listings across India.
                        </p>
                    </div>
                    <Link to="/categories" className="font-label-md text-sm text-primary font-bold hover:bg-primary/10 px-5 py-2.5 rounded-xl border border-primary/20 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95 shadow-sm">
                        Explore All Categories <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-6">
                    {categories.map((cat, idx) => {
                        const count = getRealCount(cat.name, cat.searchKey);
                        return (
                            <Link
                                to={`/category/${encodeURIComponent(cat.name)}`}
                                key={idx}
                                className="bg-surface rounded-2xl md:rounded-3xl card-shadow overflow-hidden group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1.5 active:scale-95 flex flex-col"
                            >
                                <div className="h-28 sm:h-32 md:h-36 bg-surface-container flex items-center justify-center p-2 sm:p-3 relative overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                                        src={cat.img}
                                        alt={cat.name}
                                    />
                                    <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur text-primary text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-lg border border-primary/20 shadow-sm">
                                        {loading ? "..." : `${count} ${count === 1 ? 'Item' : 'Items'}`}
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 text-center bg-surface flex-1 flex flex-col justify-center">
                                    <div className="flex items-center justify-center gap-1.5 mb-1">
                                        <span className="material-symbols-outlined text-primary text-base sm:text-lg">{cat.icon}</span>
                                        <h3 className="font-title-md text-xs sm:text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                                            {cat.name}
                                        </h3>
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-on-surface-variant font-medium">
                                        {loading ? "Loading..." : `${count} Available`}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HomeCategories;
