import React from 'react';

const Home = () => {
    return (
        <div className="bg-background text-on-surface font-body-md antialiased pt-[72px]">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center w-full h-full z-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkRktGkxqZeIEYHqiPHJYQtjg9Mm3G4m2ZvOvL92ouRndOTxVqIs76XZprAgczYOhIoUj2h5iE-Re8uwI0aZkTjSNiF9QU_8wAysRV4AwVSRW3fHM9m66nJyrcIiR5tf3EDNO-1RQMYoslK2XNQvCd_n7oCQxvaE_-E3hUnUJOVTyMgQIGdzvtyVg1eVE07Ho625Ork2T2dkFSlQXjxAiqUQbzRQmU4gGBU4Md6pd6mm4APa6dzEdjZw')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/60 to-transparent z-10"></div>
                <div className="relative z-20 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center mt-12">
                    <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl mb-6">Buy &amp; Sell Used Farming Equipment Across India</h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">The most trusted marketplace for modern agricultural machinery.</p>
                    <div className="w-full max-w-3xl glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 bg-surface rounded-lg flex items-center px-4 border border-outline-variant focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-outline">search</span>
                            <input className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface ml-2 py-3" placeholder="What are you looking for?" type="text"/>
                        </div>
                        <div className="w-full md:w-1/4 bg-surface rounded-lg flex items-center px-4 border border-outline-variant">
                            <span className="material-symbols-outlined text-outline">category</span>
                            <select className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface ml-2 py-3 appearance-none">
                                <option>All Categories</option>
                                <option>Tractors</option>
                                <option>Harvesters</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/4 bg-surface rounded-lg flex items-center px-4 border border-outline-variant">
                            <span className="material-symbols-outlined text-outline">location_on</span>
                            <select className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface ml-2 py-3 appearance-none">
                                <option>All India</option>
                                <option>Punjab</option>
                                <option>Gujarat</option>
                            </select>
                        </div>
                        <button className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">Search</button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-full px-4 py-2 font-label-md text-label-md text-on-surface hover:bg-primary-container hover:text-on-primary cursor-pointer transition-colors">Tractor</span>
                        <span className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-full px-4 py-2 font-label-md text-label-md text-on-surface hover:bg-primary-container hover:text-on-primary cursor-pointer transition-colors">Rotavator</span>
                        <span className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-full px-4 py-2 font-label-md text-label-md text-on-surface hover:bg-primary-container hover:text-on-primary cursor-pointer transition-colors">Cultivator</span>
                        <span className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-full px-4 py-2 font-label-md text-label-md text-on-surface hover:bg-primary-container hover:text-on-primary cursor-pointer transition-colors">Harvester</span>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">Browse by Category</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2">Find the exact equipment you need for your farm.</p>
                    </div>
                    <a className="font-label-md text-label-md text-primary hover:underline hidden md:block" href="#">View All Categories</a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
                    <div className="bg-surface rounded-2xl card-shadow overflow-hidden cursor-pointer group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-surface-container relative">
                            <img className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkCU4wzOwIgJGePnIVCE7oS1JVLfqBQZelpjmcr_qoWw2X9w9szKQIuekUTRm0mNAXMIyAEdCyaCRC7_4PVgdPkoKjsHI3ar9IfGmocaOKMPQq1PcbeeCm3KvMRyEBSeHqFXeiBJjGCGnq1gYzfk7CE33HBQz-m0nHCwObeXtIfcR7voCi0EVlqNqtyHE1Z-QuCea61TeqT5ZP-RV3cQazkR3Zzv5ZtB35EM6MbzF7CBye0RNA4jgbtQ" alt="Tractors" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Tractors</h3>
                        </div>
                    </div>
                    <div className="bg-surface rounded-2xl card-shadow overflow-hidden cursor-pointer group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-surface-container relative">
                            <img className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv_w5beeF2WOzJBihQxE-XhWpFNkshBRmg9StWWc0toa7upE0pF0tygEG7yFeIRPS0YJfxWWX9cz2j9w2SNANE0vb1bl3zt_IiYEu2vulYwC5M3zeXSTMg-FKGbuz3edXvvF1dY89ZrjImIZbw9J7Kn2UPqHqZwAz4j67ipMdry_aRysYf4jXREgxLTAZwBjTA2Pc1JwiENkMa1tO0f-PWHMuroUDhhSGH1PyaYQbX8gm5-1zvi5i6cg" alt="Rotavator" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Rotavator</h3>
                        </div>
                    </div>
                    <div className="bg-surface rounded-2xl card-shadow overflow-hidden cursor-pointer group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-surface-container relative">
                            <img className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG-x2Iva2_JROLsbQD1Adn0uuEDLpnJzlBu_mPYwiN0pP56VYLK3K5vrDmDhEJt9nghJue-0XQvDpyUqRVyUifO7YHJAYPji3aEDUT1NJDGk0pusCHc3KOYJ9z55YJ_tIFIo-02t2k2InxxpINiKaGNK5vATMnNn6E6zRgHBX-x0jHEnzwR_gWsURRLUomOK8lbWh0FnstFpH61yZXWEy_rSCvDtmf0mS110i0yMS_mf6nbgA_HoS7Ug" alt="Cultivator" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Cultivator</h3>
                        </div>
                    </div>
                    <div className="bg-surface rounded-2xl card-shadow overflow-hidden cursor-pointer group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-surface-container relative">
                            <img className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzhvZGLIn5hxPR0Civ_P894fw6UURj5JiVnxkxWsx55EEvi1m-4DzDtUxWS67cW7cFw4Pr2nqa3gCu9yrmQGPOyZpCrO9e44qqV7iaoWa5oWptlADJNKuCzi6z6Qv8DydDiVFhCU74mY-9jGYo4O-NXgV0oW6f_m3_-ULnJNdPDSCvuasbbjpHjBkmCVBne-CgHwt52Yr_Cd07teNfFuIlvCRLYk_6Asyd45cT424HDTIz4r5P-6GyYQ" alt="Plough" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Plough</h3>
                        </div>
                    </div>
                    <div className="bg-surface rounded-2xl card-shadow overflow-hidden cursor-pointer group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-surface-container relative">
                            <img className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA93teIHrSA3iIqq77X2nHOFQF8bDxQwD2y904cQZDwuEHCkGib-mI6T-tEAbh8151SyTXkGOFQUBGmyQKMfauUEET1np2kKgNX-nE_avYQSWO-QbbJCLU14B1PtyDDcWOyt0eNQ2DqkDDZoVSsG6bdN-mGOpkzbm94cbqZmY7YCH94Uope-T-t9VW9Dlii0sBxgvtjQsCpEvb_ma-kezYTeVZpW586nj7pGphZYujoyti5fhJ6obiAw" alt="Harvester" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Harvester</h3>
                        </div>
                    </div>
                    <div className="bg-surface rounded-2xl card-shadow overflow-hidden cursor-pointer group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-surface-container relative">
                            <img className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8WhAcBIS71SV4hKXoeBwqJNB5DqqTvnZCW-GBbs8vmRHROFCuwEGNa8IzutyDDEVGRD6SZ5u1ebM3qtSgIjlNu4Ig4ew_INxCC4I39WFanzjF_ekrjS-58AG9iAJv1QEzV7fVTzRGyE-OGI4t4EGFKuZcY0L0J0RU51V4V6JReZLb5bek7x5XS6FydFGiIo9PMDPcdUxpgh0UNBsdCtv1Y9ckB5nhcRrC2nkdvrtcJQy2D9szBy2X3A" alt="Trailer" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Trailer</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Equipment Listings */}
            <section className="py-stack-lg bg-surface-bright border-y border-outline-variant/20">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">Latest Equipment</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Recently added machinery from verified sellers.</p>
                        </div>
                        <button className="font-label-md text-label-md bg-surface border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-container transition-colors hidden md:block">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30">
                            <div className="relative h-48 bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWZdxf5cvj3b_9VwOd3Dbza4PsAK0fJJXyR-UCUq_eJ-BLoH4mmeHeDors6hfB1JEJa1vycR9ICZpadTl84sBzrPUAchTCJeakj_D2ooZeOh3u4EbNn8t0-_uvathQlyJHs4FoG5la9itO2dG1cU1pJ39kjZdFPB0uHUb5Wdjlo6eDyFQ55Nnw3vFiFhDULsXVebuNYh5PQJqbs0k3XwnlcDw_IRSTjK9pNkr0MRU5atzLChtUuDdQtQ" alt="John Deere 5310 2WD" />
                                <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <span className="material-symbols-outlined text-[14px]">star</span> Featured
                                </div>
                                <div className="absolute top-2 right-2 glass-panel rounded-full p-1.5 cursor-pointer hover:bg-white/40 transition-colors">
                                    <span className="material-symbols-outlined text-white">favorite</span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-title-md text-title-md text-on-surface line-clamp-2">John Deere 5310 2WD</h3>
                                    <span className="glass-panel text-primary-container font-label-sm px-2 py-0.5 rounded text-xs ml-2 whitespace-nowrap border-primary/20">Verified</span>
                                </div>
                                <p className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container mb-4">₹ 7,50,000</p>
                                <div className="flex gap-4 mb-4 border-b border-outline-variant/20 pb-4">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Year</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">2021</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Hours</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">1200 h</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Condition</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">Excellent</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-outline">location_on</span>
                                    <span className="font-body-md text-body-md text-on-surface-variant">Ludhiana, Punjab</span>
                                </div>
                                <div className="mt-auto flex gap-2">
                                    <button className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-2 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">call</span> Call
                                    </button>
                                    <button className="bg-[#25D366]/10 text-[#128C7E] font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center border border-[#25D366]/30">
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30">
                            <div className="relative h-48 bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5XPRPvkVkohXEVxl_ItBTDQQJYEZi4g543jqkFumzyTS2LtnKaK2-8mJkc-Eyp5JpcPyIKwfsR8VC_VcRY7KFfsAUrojHUdeM4gslsfX3i8O8PFA7itvQQW8SlvZmowdxALLwTzsV2Qi1lwEBrIflwyRE8fEuVDaAFI_EB39Rx85_jc3vU7epTE3ZsOYWa8IHzv6KXPY6Znn3ANAhw2fCrUXCOX1ph5Dp1g_sI7A-Gy_C4zKoaY8KkA" alt="Mahindra Arjun Novo" />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-title-md text-title-md text-on-surface line-clamp-2">Mahindra Arjun Novo 605 DI-i</h3>
                                </div>
                                <p className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container mb-4">₹ 6,80,000</p>
                                <div className="flex gap-4 mb-4 border-b border-outline-variant/20 pb-4">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Year</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">2019</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Hours</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">2500 h</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Condition</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">Good</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-outline">location_on</span>
                                    <span className="font-body-md text-body-md text-on-surface-variant">Rajkot, Gujarat</span>
                                </div>
                                <div className="mt-auto flex gap-2">
                                    <button className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-2 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">call</span> Call
                                    </button>
                                    <button className="bg-[#25D366]/10 text-[#128C7E] font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center border border-[#25D366]/30">
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30">
                            <div className="relative h-48 bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrlfPS9tK3o4_1WLmzz_bZdYmcbVGnRL3_4ZG7h6gj03ozZdCJ3GtVbrPwuoSG1TmUiGOKaM5Ni7htsjcpYEoM2IBOnGreNohRHolNN9z0W6xczrwY11CuqmCWsqAg002u5dHcX5lSsNIjZ25bUL9I54IJDbh9RsNYI48UDEfQ4TvEGqUVAnPZoyd2YYAMWupVpIZPdq4-OqwDHztYfDuRlbKfM3X3fZdyyXqhjiyASOV6fqh87B-12Q" alt="Shaktiman Rotavator" />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-title-md text-title-md text-on-surface line-clamp-2">Shaktiman Regular Light Rotavator</h3>
                                </div>
                                <p className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container mb-4">₹ 95,000</p>
                                <div className="flex gap-4 mb-4 border-b border-outline-variant/20 pb-4">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Year</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">2022</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Width</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">6 ft</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Condition</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">Like New</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-outline">location_on</span>
                                    <span className="font-body-md text-body-md text-on-surface-variant">Pune, Maharashtra</span>
                                </div>
                                <div className="mt-auto flex gap-2">
                                    <button className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-2 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">call</span> Call
                                    </button>
                                    <button className="bg-[#25D366]/10 text-[#128C7E] font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center border border-[#25D366]/30">
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30">
                            <div className="relative h-48 bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtY9yDD4nf6bMGZosv0v_WTBSVvER9zP71sqxIGkk7LSIwrb5F9W24KqRFzVqRTCxXDLQiu_hsZdYmS-wZm-b3MhGig04LiQYEt7nDUhaufix6CABQzR3oRLGSk7Qj5k7mdsviET4_HF_U4jfTssOodUJ4NeNbc3U4JW-8LiR65OpodDVi1PaQUhD0IQ9AxPPZBahAuIDTQpm_zLjuti1vgaOIf2tsWZ_uHfiPx7E74ouxvsAgAG9emg" alt="Preet Harvester" />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-title-md text-title-md text-on-surface line-clamp-2">Preet 987 Combine Harvester</h3>
                                </div>
                                <p className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container mb-4">₹ 18,50,000</p>
                                <div className="flex gap-4 mb-4 border-b border-outline-variant/20 pb-4">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Year</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">2018</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Hours</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">4200 h</span>
                                    </div>
                                    <div className="w-px bg-outline-variant/30"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Condition</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">Fair</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-outline">location_on</span>
                                    <span className="font-body-md text-body-md text-on-surface-variant">Karnal, Haryana</span>
                                </div>
                                <div className="mt-auto flex gap-2">
                                    <button className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-2 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">call</span> Call
                                    </button>
                                    <button className="bg-[#25D366]/10 text-[#128C7E] font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center border border-[#25D366]/30">
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dealer Section & Premium Memberships */}
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
        </div>
    );
};

export default Home;