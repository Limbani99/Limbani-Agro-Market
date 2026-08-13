import React, { useState, useEffect } from 'react';
import DealerCard from './DealerCard';
import { useData } from '../context/DataProvider';

const FeaturedDealers = ({ dealers: apiDealers }) => {
    const dataCtx = useData() || {};
    const getAllDealer = dataCtx.getAllDealer;
    const getAllProduct = dataCtx.getAllProduct;

    const [dealers, setDealers] = useState(apiDealers || []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(!apiDealers || apiDealers.length === 0);

    useEffect(() => {
        const fetchData = async () => {
            if (apiDealers && apiDealers.length > 0) {
                setDealers(apiDealers);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const [dealerList, productList] = await Promise.all([
                    getAllDealer ? getAllDealer() : Promise.resolve([]),
                    getAllProduct ? getAllProduct() : Promise.resolve([])
                ]);
                const validDealers = Array.isArray(dealerList) ? dealerList : (dealerList?.dealers || []);
                const validProducts = Array.isArray(productList) ? productList : [];
                setDealers(validDealers);
                setProducts(validProducts);
            } catch (err) {
                console.warn("FeaturedDealers data load notice:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiDealers]);

    const rawList = dealers || [];

    const normalizedDealers = rawList.map((dealer, idx) => {
        const dId = dealer._id || dealer.id;
        const dName = dealer.name || dealer.contactPerson || dealer.company || dealer.username || "";

        // Calculate total products added by dealer dynamically
        let productCount = 0;
        if (dealer.totalListed !== undefined && dealer.totalListed !== null) {
            productCount = dealer.totalListed;
        } else if (dealer.listingsCount !== undefined && dealer.listingsCount !== null && dealer.listingsCount !== 15) {
            productCount = dealer.listingsCount;
        } else if (products.length > 0) {
            productCount = products.filter(p => {
                const sId = p.sellerId?._id || p.sellerId || p.seller?._id || p.seller;
                return (dId && String(sId) === String(dId)) || (dName && (p.seller === dName || p.sellerName === dName));
            }).length;
        } else if (dealer.products && Array.isArray(dealer.products)) {
            productCount = dealer.products.length;
        }

        // Format location without fake default strings
        let loc = "";
        if (typeof dealer.address === 'string' && dealer.address.trim()) {
            loc = dealer.address.trim();
        } else if (dealer.city || dealer.district || dealer.state) {
            loc = [dealer.city || dealer.district, dealer.state].filter(Boolean).join(", ");
        } else if (typeof dealer.location === 'string' && dealer.location.trim()) {
            loc = dealer.location.trim();
        }

        return {
            id: dId || idx + 1,
            name: dName || "Agro Dealer",
            image: dealer.profileimg || dealer.profilePicture || dealer.image || dealer.coverimg || "",
            rating: dealer.rating || null,
            isVerified: dealer.isVerified || false,
            isPremium: dealer.isPremium || false,
            yearsInBusiness: dealer.yearsInBusiness || null,
            location: loc,
            listingsCount: productCount,
            phone: dealer.phone || "",
            whatsapp: dealer.whatsapp || dealer.phone || ""
        };
    });

    return (
        <section className="py-8 sm:py-12 md:py-16 max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-outline-variant/30 pb-4 sm:pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2 border border-primary/20">
                        <span className="material-symbols-outlined text-sm">storefront</span> Verified Agro Dealers
                    </div>
                    <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface">
                        Featured Premium Dealers
                    </h2>
                    <p className="text-on-surface-variant text-sm sm:text-base mt-1 font-medium">
                        Top-rated agricultural machinery sellers & official dealerships near you
                    </p>
                </div>
            </div>

            {/* Skeleton Loading State */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="bg-surface-container-lowest dark:bg-surface-container-low rounded-3xl p-5 border border-outline-variant/30 card-shadow space-y-4 animate-pulse">
                            <div className="h-40 bg-surface-container rounded-2xl w-full"></div>
                            <div className="h-6 bg-surface-container rounded-xl w-3/4"></div>
                            <div className="h-4 bg-surface-container rounded-lg w-1/2"></div>
                            <div className="h-10 bg-surface-container rounded-xl w-full mt-4"></div>
                        </div>
                    ))}
                </div>
            ) : normalizedDealers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {normalizedDealers.map(dealer => (
                        <DealerCard key={dealer.id} dealer={dealer} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow">
                    <span className="material-symbols-outlined text-5xl text-outline mb-2">storefront</span>
                    <p className="text-on-surface-variant font-bold text-base">No dealers available right now.</p>
                </div>
            )}
        </section>
    );
};

export default FeaturedDealers;
