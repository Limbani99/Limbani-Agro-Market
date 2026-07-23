import React from 'react';

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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Dealer Card 1 */}
                    <article className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow border border-surface-variant flex flex-col hover:border-primary-container transition-colors group">
                        <div className="h-48 relative overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dealership" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMz6a1af8ctKfb6MW5b8lwciGHdWHxSaumBrktSe8aw3vSzEQgc3F4ZALlUoe5yyMRD-0RODe2gDm4Uw3zBTabYO4uJLa-avnT0El_qmr3dZxdSCHIPKIxJXBLtFbfwmq8NaKE74CpUbQD09CHSeGhTDHrzWbvZ7Bf_M_9HV2ieZaeLg3apUasi_dCJcN7a_h5uKchYzJK2xNrdencJKbOV5DIMbLaz6CZjKn7DaLN35VTV0T6nICNGw"/>
                            <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container font-label-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm font-bold text-xs">
                                <span className="material-symbols-outlined text-[14px]">workspace_premium</span> Premium
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-title-md text-xl font-bold text-on-surface">Kisan Agro Motors</h3>
                                <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded text-xs font-bold text-on-surface">
                                    <span className="material-symbols-outlined text-[14px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                                </div>
                            </div>
                            <p className="text-on-surface-variant text-sm mb-4 flex items-center gap-1 font-medium">
                                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified Dealer • 15 Years in Business
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-outline">location_on</span>
                                    Pune, Maharashtra
                                </div>
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-outline">inventory_2</span>
                                    245 Listings
                                </div>
                            </div>
                            <div className="mt-auto grid grid-cols-2 gap-2">
                                <button className="w-full bg-surface-container border border-outline-variant text-on-surface font-semibold text-sm py-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">call</span> Call
                                </button>
                                <button className="w-full bg-[#128C7E]/10 border border-[#128C7E] text-[#128C7E] font-semibold text-sm py-2 rounded-lg hover:bg-[#128C7E]/20 transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                    WhatsApp
                                </button>
                                <button className="col-span-2 bg-primary-container text-on-primary font-semibold text-sm py-2 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">storefront</span> Visit Store
                                </button>
                            </div>
                        </div>
                    </article>
                    
                    {/* Dealer Card 2 */}
                    <article className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow border border-surface-variant flex flex-col hover:border-primary-container transition-colors group">
                        <div className="h-48 relative overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dealership" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmOqKD_oaecwxA4h5okVY0KCnTpZhTCf4QPE5K9MWWqcIEfmodtbjtsBs6VD3EE8O4J81j9qXjmEDiJFmtSXf4o13W4B2dtZcrdVaSHGJ7aT_I989BDw4aL-k2FhMA_NtR93UXR7ER9V49_lpikMuZsZn37-lGRaaCmnYpFstGeDhaFs-syNlQG-40ExvdyNsmRSk8QvnAl3zh2LaIwJbBGvIwwEzKzbLjsy2NVKvj5_E-xXVnyx_VYg"/>
                            <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container font-label-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm font-bold text-xs">
                                <span className="material-symbols-outlined text-[14px]">workspace_premium</span> Premium
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-title-md text-xl font-bold text-on-surface">Shreeji Tractors</h3>
                                <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded text-xs font-bold text-on-surface">
                                    <span className="material-symbols-outlined text-[14px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.6
                                </div>
                            </div>
                            <p className="text-on-surface-variant text-sm mb-4 flex items-center gap-1 font-medium">
                                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified Dealer • 8 Years in Business
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-outline">location_on</span>
                                    Rajkot, Gujarat
                                </div>
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-outline">inventory_2</span>
                                    180 Listings
                                </div>
                            </div>
                            <div className="mt-auto grid grid-cols-2 gap-2">
                                <button className="w-full bg-surface-container border border-outline-variant text-on-surface font-semibold text-sm py-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">call</span> Call
                                </button>
                                <button className="w-full bg-[#128C7E]/10 border border-[#128C7E] text-[#128C7E] font-semibold text-sm py-2 rounded-lg hover:bg-[#128C7E]/20 transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                    WhatsApp
                                </button>
                                <button className="col-span-2 bg-primary-container text-on-primary font-semibold text-sm py-2 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">storefront</span> Visit Store
                                </button>
                            </div>
                        </div>
                    </article>
                    
                    {/* Dealer Card 3 */}
                    <article className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow border border-surface-variant flex flex-col hover:border-primary-container transition-colors group">
                        <div className="h-48 relative overflow-hidden bg-surface-container">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dealership" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBapQawQ8-cPbOal3lRBjxxHIifaydF8-nz2CXY6SZX6intjSLwtW9ksHWWnLYmHytNLvT3VlomsLkUFubvOc3nrMBvHNcVCcIkv6qUoDxUOfszHjLtqbWbH10lf7udE3qFwkdXh4f_vrlpMgEvIMzcJjE5Rs3CjKdb9b1IGzHIiVeRz9mPRQsCotFcsrh51j5To1viEG30U_QRD5A_hgImzmIYLmB48uXND7AjdDQFAqNW-oQqnQ91SA"/>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-title-md text-xl font-bold text-on-surface">Punjab Agri Equipments</h3>
                                <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded text-xs font-bold text-on-surface">
                                    <span className="material-symbols-outlined text-[14px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.9
                                </div>
                            </div>
                            <p className="text-on-surface-variant text-sm mb-4 flex items-center gap-1 font-medium">
                                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified Dealer • 20 Years in Business
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-outline">location_on</span>
                                    Ludhiana, Punjab
                                </div>
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-outline">inventory_2</span>
                                    310 Listings
                                </div>
                            </div>
                            <div className="mt-auto grid grid-cols-2 gap-2">
                                <button className="w-full bg-surface-container border border-outline-variant text-on-surface font-semibold text-sm py-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">call</span> Call
                                </button>
                                <button className="w-full bg-[#128C7E]/10 border border-[#128C7E] text-[#128C7E] font-semibold text-sm py-2 rounded-lg hover:bg-[#128C7E]/20 transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                    WhatsApp
                                </button>
                                <button className="col-span-2 bg-primary-container text-on-primary font-semibold text-sm py-2 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">storefront</span> Visit Store
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Dealers;
