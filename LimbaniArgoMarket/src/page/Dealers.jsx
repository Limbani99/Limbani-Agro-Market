import React from 'react';
import FeaturedDealers from '../components/FeaturedDealers';

const Dealers = () => {
    return (
        <main className="w-full pt-[72px]">
            {/* Hero Banner with Glass Search */}
            <header className="relative w-full min-h-[600px] flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9N-Zlo21D6d6sdSuSYAyAlWJn6GtL-cpHfu9uZ7TQpOGHZooSW6rtyrRFKRwIl_iAwpO0mT8UPoEk9BNHCvqiSamn8ykg43ATiylKgrfgB3Dpk7gSciBG0DF5fr6ev8LkBbjNdfocXa0i-G9VtCV78DCKYam_rXuG4SBjCE72OWNNF8eaBCNNgDEVrQA1wUue7KLjm0rWrmPqxBByCIhWJLAuYXT0Oic0I5uP5OTG5SriCVQ1pIb3RQ')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-on-background/60 to-on-background/80"></div>
                </div>
                
                <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg text-center flex flex-col items-center">
                    <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-primary mb-4 max-w-4xl drop-shadow-lg font-bold">
                        Find Trusted Agricultural Equipment Dealers Near You
                    </h1>
                    <p className="font-body-lg text-lg md:text-xl text-surface-container-highest mb-10 max-w-2xl drop-shadow-md">
                        Connect with verified dealers selling tractors, harvesters, implements and farming machinery across India.
                    </p>
                    
                    {/* Glass Search Module */}
                    <div className="glass-search rounded-xl p-2 w-full max-w-5xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">storefront</span>
                            <input className="w-full h-12 pl-12 pr-4 bg-transparent border-0 focus:ring-0 text-on-surface placeholder-outline font-body-md rounded-lg" placeholder="Dealer Name or Brand" type="text"/>
                        </div>
                        <div className="hidden md:block w-px bg-outline-variant/30 my-2"></div>
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                            <select className="w-full h-12 pl-12 pr-4 bg-transparent border-0 focus:ring-0 text-on-surface font-body-md rounded-lg appearance-none">
                                <option value="">Select State</option>
                                <option value="mh">Maharashtra</option>
                                <option value="gj">Gujarat</option>
                                <option value="pb">Punjab</option>
                            </select>
                        </div>
                        <div className="hidden md:block w-px bg-outline-variant/30 my-2"></div>
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">category</span>
                            <select className="w-full h-12 pl-12 pr-4 bg-transparent border-0 focus:ring-0 text-on-surface font-body-md rounded-lg appearance-none">
                                <option value="">All Categories</option>
                                <option value="tractor">Tractors</option>
                                <option value="harvester">Harvesters</option>
                                <option value="implement">Implements</option>
                            </select>
                        </div>
                        <button className="bg-primary-container text-on-primary font-label-md h-12 px-8 rounded-lg hover:bg-primary transition-colors active:scale-95 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">search</span>
                            Find Dealers
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="w-full bg-surface border-b border-surface-variant py-10">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
                    <div className="bg-surface-container rounded-xl p-6 text-center card-shadow">
                        <h3 className="font-title-md text-2xl text-primary font-bold mb-1">2,500+</h3>
                        <p className="font-body-md text-sm text-on-surface-variant">Verified Dealers</p>
                    </div>
                    <div className="bg-surface-container rounded-xl p-6 text-center card-shadow">
                        <h3 className="font-title-md text-2xl text-primary font-bold mb-1">45,000+</h3>
                        <p className="font-body-md text-sm text-on-surface-variant">Equipment Listings</p>
                    </div>
                    <div className="bg-surface-container rounded-xl p-6 text-center card-shadow">
                        <h3 className="font-title-md text-2xl text-primary font-bold mb-1">28</h3>
                        <p className="font-body-md text-sm text-on-surface-variant">States Covered</p>
                    </div>
                    <div className="bg-surface-container rounded-xl p-6 text-center card-shadow">
                        <h3 className="font-title-md text-2xl text-primary font-bold mb-1">150,000+</h3>
                        <p className="font-body-md text-sm text-on-surface-variant">Farmers Connected</p>
                    </div>
                </div>
            </section>

            {/* Featured Dealers Grid */}
            <FeaturedDealers />
        </main>
    );
};

export default Dealers;
