import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState(null);

    const showComingSoonToast = (categoryName) => {
        setToastMessage(`${categoryName} section is Coming Soon! We are working hard to launch this feature.`);
        setTimeout(() => setToastMessage(null), 4000);
    };

    return (
        <main className="min-h-screen bg-surface dark:bg-surface-dim pt-24 pb-16 px-4 sm:px-margin-mobile md:px-margin-desktop transition-colors">
            <div className="max-w-[1280px] mx-auto">

                {/* Coming Soon Toast Notification */}
                {toastMessage && (
                    <div className="fixed top-24 right-4 z-50 bg-secondary text-on-secondary px-6 py-3.5 rounded-2xl shadow-2xl border border-secondary/30 flex items-center gap-3 animate-[slideIn_0.3s_ease-out]">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
                        <div className="font-bold text-sm sm:text-base">{toastMessage}</div>
                        <button onClick={() => setToastMessage(null)} className="ml-2 text-on-secondary/80 hover:text-on-secondary">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                )}

                {/* Header Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-outline-variant/30 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2 border border-primary/20">
                            <span className="material-symbols-outlined text-sm">add_circle</span> Sell / List Equipment
                        </div>
                        <h1 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface">
                            Select Product Category
                        </h1>
                        <p className="text-on-surface-variant text-sm sm:text-base mt-1 font-medium">
                            Choose the type of agricultural equipment or products you want to list on Limbani Agro Market
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-all border border-outline-variant/40 self-start sm:self-auto active:scale-95"
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Home
                    </Link>
                </div>

                {/* 4 Main Category Cards Grid (Image 2 Architecture) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                    {/* CARD 1: Drivable Vehicles */}
                    <div className="bg-surface-container-lowest dark:bg-surface-container-low rounded-3xl p-6 sm:p-8 card-shadow border border-outline-variant/40 hover:border-primary/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-3xl">agriculture</span>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                    Active Category
                                </span>
                            </div>

                            <h2 className="font-display-lg text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                                Drivable Vehicles
                            </h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-normal">
                                Self-propelled machinery equipped with engine & driver seat for field work and haulage.
                            </p>

                            {/* Equipment Included Pills */}
                            <div className="space-y-2 mb-6">
                                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Includes Vehicles:</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">🚜 Tractors</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">🌾 Combine Harvesters</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">⚡ Mini Tractors</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">🚛 Commercial Trucks</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/add-drivable')}
                            className="w-full bg-primary text-on-primary font-bold text-sm sm:text-base py-3.5 rounded-2xl hover:bg-primary/90 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            <span>Add Drivable Vehicle</span>
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </button>
                    </div>

                    {/* CARD 2: Non-Drivable Vehicles / Implements */}
                    <div className="bg-surface-container-lowest dark:bg-surface-container-low rounded-3xl p-6 sm:p-8 card-shadow border border-outline-variant/40 hover:border-primary/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-3xl">hardware</span>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                    Active Category
                                </span>
                            </div>

                            <h2 className="font-display-lg text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                                Non-Drivable Vehicles
                            </h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-normal">
                                Tractor-mounted attachments, tillers, towed implements, trailers & field equipment.
                            </p>

                            {/* Equipment Included Pills */}
                            <div className="space-y-2 mb-6">
                                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Includes Implements:</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">⚙️ Cultivator</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">🔄 Rotavator</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">🌱 Seed Drill</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">📦 Trailer</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">🌾 Thresher</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/30">⛏️ Plough & Harrow</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/add-nondrivable')}
                            className="w-full bg-primary text-on-primary font-bold text-sm sm:text-base py-3.5 rounded-2xl hover:bg-primary/90 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            <span>Add Non-Drivable Equipment</span>
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </button>
                    </div>

                    {/* CARD 3: Fertilizer (COMING SOON) */}
                    <div className="bg-surface-container-lowest/70 dark:bg-surface-container-low/70 rounded-3xl p-6 sm:p-8 card-shadow border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between opacity-95 group">
                        {/* Coming Soon Banner Ribbon Overlay */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/40 font-extrabold text-xs tracking-wide shadow-sm animate-pulse">
                                <span className="material-symbols-outlined text-sm">lock</span> COMING SOON
                            </span>
                        </div>

                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-4 shadow-sm">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>

                            <h2 className="font-display-lg text-2xl font-bold text-on-surface mb-2">
                                Fertilizer & Crop Care
                            </h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-normal">
                                Organic fertilizers, bio-pesticides, soil nutrients, micronutrients & seed varieties.
                            </p>

                            <div className="space-y-2 mb-6">
                                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Upcoming Items:</span>
                                <div className="flex flex-wrap gap-2 opacity-75">
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/20">🌱 Organic Fertilizers</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/20">💧 Bio Pesticides</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/20">🧪 Soil Nutrients</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => showComingSoonToast('Fertilizer')}
                            className="w-full bg-surface-container text-on-surface-variant font-bold text-sm sm:text-base py-3.5 rounded-2xl border border-outline-variant/40 hover:bg-surface-container-high active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            <span className="material-symbols-outlined text-xl">hourglass_top</span>
                            <span>Coming Soon</span>
                        </button>
                    </div>

                    {/* CARD 4: Farming Tools (COMING SOON) */}
                    <div className="bg-surface-container-lowest/70 dark:bg-surface-container-low/70 rounded-3xl p-6 sm:p-8 card-shadow border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between opacity-95 group">
                        {/* Coming Soon Banner Ribbon Overlay */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/40 font-extrabold text-xs tracking-wide shadow-sm animate-pulse">
                                <span className="material-symbols-outlined text-sm">lock</span> COMING SOON
                            </span>
                        </div>

                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-4 shadow-sm">
                                <span className="material-symbols-outlined text-3xl">handyman</span>
                            </div>

                            <h2 className="font-display-lg text-2xl font-bold text-on-surface mb-2">
                                Farming Tools & Hardware
                            </h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-normal">
                                Hand tools, power sprayers, drip irrigation pipes, pruning shears & farm hardware.
                            </p>

                            <div className="space-y-2 mb-6">
                                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Upcoming Items:</span>
                                <div className="flex flex-wrap gap-2 opacity-75">
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/20">💦 Power Sprayers</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/20">🛠️ Hand Tools</span>
                                    <span className="bg-surface-container px-3 py-1 rounded-lg text-xs font-bold text-on-surface border border-outline-variant/20">🚿 Irrigation Pipes</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => showComingSoonToast('Farming Tools')}
                            className="w-full bg-surface-container text-on-surface-variant font-bold text-sm sm:text-base py-3.5 rounded-2xl border border-outline-variant/40 hover:bg-surface-container-high active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            <span className="material-symbols-outlined text-xl">hourglass_top</span>
                            <span>Coming Soon</span>
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default AddProduct;