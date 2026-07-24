import React from 'react';

const Categories = () => {
    return (
        <main className="w-full pt-[72px]">
            {/* Hero Banner */}
            <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <img alt="Cinematic farming landscape with modern equipment" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAopxn5Zb3qW4oFfQDyGrdfmw6GTuWdsp-ycKBkw68SnL_CZrUncAkJetQHMmpOzNvFjWfGhnJMxfDWM0HuSPB5xRdTd2EhRXBQkGhJ3VFSP8Nhx627PZe3SMmLtEM2f1_g1RGd4fZ7dZa35Cgr-_4Ek4U9y759CDUP9Dj5M9p1JS8rj7g4dhb8lrCrB_n4PF2OYyqYj32qGprjTyryHIu4AFU66rK20cdvqsC5JzZ9FS20S6ca195UTA" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 flex flex-col items-start text-white">
                    <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
                        <a className="hover:text-white transition-colors" href="#">Home</a>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="font-medium text-secondary">Categories</span>
                    </nav>
                    <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl leading-tight text-white">Browse Farming Equipment Categories</h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light">Explore a wide range of tractors, implements, and machinery from top brands and trusted dealers across India.</p>

                    {/* Advanced Search Bar */}
                    <div className="glass-panel p-3 rounded-2xl flex flex-col md:flex-row gap-3 w-full max-w-5xl card-shadow border-white/30 bg-white/10">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/70">search</span>
                            <input className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/70 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="Search equipment (e.g. Mahindra 575 DI)" type="text" />
                        </div>
                        <div className="flex-1 relative md:border-l border-white/20 md:pl-3">
                            <span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 text-white/70 md:left-7">category</span>
                            <select className="w-full bg-white/20 md:bg-transparent border border-white/30 md:border-none text-white rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none appearance-none cursor-pointer">
                                <option className="text-gray-900" value="">All Categories</option>
                                <option className="text-gray-900" value="tractors">Tractors</option>
                                <option className="text-gray-900" value="implements">Implements</option>
                                <option className="text-gray-900" value="harvesters">Harvesters</option>
                            </select>
                        </div>
                        <div className="flex-1 relative md:border-l border-white/20 md:pl-3">
                            <span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 text-white/70 md:left-7">location_on</span>
                            <select className="w-full bg-white/20 md:bg-transparent border border-white/30 md:border-none text-white rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none appearance-none cursor-pointer">
                                <option className="text-gray-900" value="">All States</option>
                                <option className="text-gray-900" value="gujarat">Gujarat</option>
                                <option className="text-gray-900" value="punjab">Punjab</option>
                                <option className="text-gray-900" value="maharashtra">Maharashtra</option>
                            </select>
                        </div>
                        <button className="bg-secondary text-on-secondary-fixed px-8 py-3.5 rounded-xl font-medium hover:bg-secondary/90 transition-colors active:scale-95 text-lg shadow-lg">Search</button>
                    </div>
                </div>
            </section>

            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-20 pb-20">
                {/* Premium Category Grid */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="font-headline-lg text-3xl font-bold text-gray-900 mb-2">Explore All Categories</h2>
                            <p className="font-body-md text-gray-600">Find exactly what you need for your farm</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Tractor */}
                        <a className="group bg-white rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col" href="#">
                            <div className="h-40 overflow-hidden relative bg-surface-container">
                                <img alt="Tractor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo57NPp63tAu5Ukzyr7td4V_xcH7-3oiEHnG_k-rhYmCQx_OYvwTcQPv6YEqwT7ohBq-l9Douqnx4t8EzMu-_B3VbSjQkuMr2z88THzfT43H5eQvxqkcikZ4M9feakYSg8dK7jT8mlxFSVBZjuFwjzPh5cilU_w2M3zenKYqE6fllW3PSAYPMyFKbRjZhEAFLcU8af6KvyE_9AOCCE6mreyUcoa2nGH5HTphzTO1e-vRxwuoVTH7INag" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded-lg">12,450 listings</div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">agriculture</span>
                                    <h3 className="font-title-md text-lg font-bold text-gray-900">Tractor</h3>
                                </div>
                                <p className="font-body-sm text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 flex justify-between">
                                    <span>Starting from</span>
                                    <span className="font-bold text-gray-900">₹2.5 Lakhs</span>
                                </p>
                            </div>
                        </a>

                        {/* Mini Tractor */}
                        <a className="group bg-white rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col" href="#">
                            <div className="h-40 overflow-hidden relative bg-surface-container">
                                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-6xl">directions_car</span>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded-lg">3,200 listings</div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">directions_car</span>
                                    <h3 className="font-title-md text-lg font-bold text-gray-900">Mini Tractor</h3>
                                </div>
                                <p className="font-body-sm text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 flex justify-between">
                                    <span>Starting from</span>
                                    <span className="font-bold text-gray-900">₹1.8 Lakhs</span>
                                </p>
                            </div>
                        </a>

                        {/* Implements */}
                        <a className="group bg-white rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col" href="#">
                            <div className="h-40 overflow-hidden relative bg-surface-container">
                                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-6xl">settings</span>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded-lg">8,560 listings</div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">settings</span>
                                    <h3 className="font-title-md text-lg font-bold text-gray-900">Implements</h3>
                                </div>
                                <p className="font-body-sm text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 flex justify-between">
                                    <span>Starting from</span>
                                    <span className="font-bold text-gray-900">₹20,000</span>
                                </p>
                            </div>
                        </a>

                        {/* Harvester */}
                        <a className="group bg-white rounded-2xl overflow-hidden card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col" href="#">
                            <div className="h-40 overflow-hidden relative bg-surface-container">
                                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-6xl">eco</span>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded-lg">1,200 listings</div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">eco</span>
                                    <h3 className="font-title-md text-lg font-bold text-gray-900">Harvester</h3>
                                </div>
                                <p className="font-body-sm text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 flex justify-between">
                                    <span>Starting from</span>
                                    <span className="font-bold text-gray-900">₹15 Lakhs</span>
                                </p>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Categories;
