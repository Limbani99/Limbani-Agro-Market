import React from 'react';

const OurStory = () => {
    return (
        <section className="py-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="rounded-2xl overflow-hidden card-shadow">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo57NPp63tAu5Ukzyr7td4V_xcH7-3oiEHnG_k-rhYmCQx_OYvwTcQPv6YEqwT7ohBq-l9Douqnx4t8EzMu-_B3VbSjQkuMr2z88THzfT43H5eQvxqkcikZ4M9feakYSg8dK7jT8mlxFSVBZjuFwjzPh5cilU_w2M3zenKYqE6fllW3PSAYPMyFKbRjZhEAFLcU8af6KvyE_9AOCCE6mreyUcoa2nGH5HTphzTO1e-vRxwuoVTH7INag" 
                            alt="Farmers and agricultural equipment" 
                            className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" 
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-2xl card-shadow border border-outline-variant/30 hidden md:block">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">handshake</span>
                            </div>
                            <div>
                                <h4 className="font-title-md text-xl font-bold text-on-surface">Built for India</h4>
                                <p className="text-sm text-on-surface-variant font-medium">Connecting every village</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-6 border border-primary/20 font-bold">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Our Story
                    </div>
                    <h2 className="font-display-md text-4xl font-bold text-on-surface mb-6 leading-tight">
                        Why We Started Limbani Agro Market
                    </h2>
                    <div className="space-y-6 font-body-lg text-lg text-on-surface-variant leading-relaxed">
                        <p>
                            Farming equipment is expensive, and many machines remain unused after seasonal work. This creates a massive financial burden for small and marginal farmers who cannot afford brand-new machinery.
                        </p>
                        <p>
                            We created <strong className="text-primary font-semibold">Limbani Agro Market</strong> to bridge this gap. Our goal is to help farmers easily buy and sell second-hand agricultural machinery while connecting them with trusted dealers and service providers across India.
                        </p>
                        <p>
                            By bringing transparency, trust, and digital convenience to the agricultural sector, we ensure that no farm is left behind due to a lack of affordable equipment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
