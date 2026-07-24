import React from 'react';

const DealersNetwork = () => {
    return (
        <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Verified Dealer Network</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Connect with top-rated agricultural machinery dealers near you or upgrade your account to sell faster.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-surface rounded-2xl border border-outline-variant p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-outline-variant/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary">workspace_premium</span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface">Silver Dealer</h3>
                    </div>
                    <ul className="space-y-3 mb-8 font-body-md text-body-md text-on-surface-variant">
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Up to 10 active listings</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Standard search visibility</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Basic seller profile</li>
                    </ul>
                    <button className="mt-auto w-full border border-primary text-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary/5 transition-colors">Become Silver</button>
                </div>
                <div className="bg-surface-bright rounded-2xl border-2 border-secondary-container p-6 flex flex-col relative transform md:-translate-y-4 shadow-lg">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary-container text-on-secondary-container font-label-sm px-4 py-1 rounded-full">Most Popular</div>
                    <div className="flex items-center gap-3 mb-4 mt-2">
                        <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary">workspace_premium</span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface">Gold Dealer</h3>
                    </div>
                    <ul className="space-y-3 mb-8 font-body-md text-body-md text-on-surface-variant">
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Up to 50 active listings</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Priority search visibility</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Verified Gold Badge</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Analytics dashboard</li>
                    </ul>
                    <button className="mt-auto w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-lg hover:opacity-90 transition-opacity">Become Gold</button>
                </div>
                <div className="bg-surface rounded-2xl border border-outline-variant p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-inverse-surface/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-inverse-surface">workspace_premium</span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface">Platinum Dealer</h3>
                    </div>
                    <ul className="space-y-3 mb-8 font-body-md text-body-md text-on-surface-variant">
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Unlimited listings</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Top search visibility</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">check_circle</span> Dedicated account manager</li>
                    </ul>
                    <button className="mt-auto w-full border border-primary text-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary/5 transition-colors">Become Platinum</button>
                </div>
            </div>
        </section>
    );
};

export default DealersNetwork;
