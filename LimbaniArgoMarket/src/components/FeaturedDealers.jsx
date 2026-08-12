import React from 'react';
import DealerCard from './DealerCard';

const FeaturedDealers = ({ dealers: apiDealers }) => {
    const rawList = apiDealers || [];

    const normalizedDealers = rawList.map((dealer, idx) => ({
        id: dealer._id || dealer.id || idx + 1,
        name: dealer.name || dealer.contactPerson || "Verified Agro Dealer",
        image: dealer.profileimg || dealer.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
        rating: dealer.rating || 4.9,
        isVerified: dealer.isVerified !== undefined ? dealer.isVerified : true,
        isPremium: dealer.isPremium !== undefined ? dealer.isPremium : true,
        yearsInBusiness: dealer.yearsInBusiness || 5,
        location: typeof dealer.address === 'string' ? dealer.address : (dealer.city ? `${dealer.city}, ${dealer.state}` : (dealer.location || "Gujarat, India")),
        listingsCount: dealer.totalListed || dealer.listingsCount || 15,
        phone: dealer.phone || "+919023341592",
        whatsapp: dealer.whatsapp || dealer.phone || "919023341592"
    }));

    return (
        <section className="py-10 md:py-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="font-title-md text-3xl font-bold text-on-surface mb-2">Featured Premium Dealers</h2>
                    <p className="font-body-md text-on-surface-variant">Top-rated agricultural equipment sellers near you.</p>
                </div>
                <a className="hidden md:flex font-label-md text-primary hover:text-primary-container items-center gap-1 font-semibold" href="#">
                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            </div>

            {normalizedDealers.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {normalizedDealers.map(dealer => (
                        <DealerCard key={dealer.id} dealer={dealer} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <span className="material-symbols-outlined text-5xl text-outline mb-2">storefront</span>
                    <p className="text-on-surface-variant font-medium">No dealers found.</p>
                </div>
            )}
        </section>
    );
};

export default FeaturedDealers;
