import React from 'react';
import DealerCard from './DealerCard';

const FeaturedDealers = ({ dealers: apiDealers }) => {

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

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {apiDealers?.map(dealer => (
                    <DealerCard key={dealer.id} dealer={dealer} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedDealers;
