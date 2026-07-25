import React from 'react';

const MeetOurTeam = () => {
    const team = [
        { name: "Patel Man Nareshbhai", role: "Founder & CEO", icon: "engineering" }
    ];

    return (
        <section className="py-20 bg-surface">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-16">
                    <h2 className="font-display-md text-3xl font-bold text-on-surface mb-4">Meet Our Founder</h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto">The passionate individual working tirelessly to transform the agricultural sector in India.</p>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Founder Image - Shows first on mobile with perfect portrait aspect ratio */}
                        <div className="relative h-[340px] sm:h-[420px] lg:h-full lg:min-h-[500px] bg-surface-container overflow-hidden order-1 lg:order-2">
                            <img
                                src="/founder.jpg"
                                alt="Patel Man Nareshbhai"
                                className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                            <div className="absolute bottom-4 left-4 lg:hidden text-white">
                                <h3 className="font-display-md text-2xl font-bold drop-shadow-md">Patel Man Nareshbhai</h3>
                                <p className="text-white/90 text-sm font-medium drop-shadow">Founder & CEO</p>
                            </div>
                        </div>

                        {/* Founder Details */}
                        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-label-sm mb-4 sm:mb-6 border border-primary/20 font-bold w-fit">
                                <span className="material-symbols-outlined text-[18px]">engineering</span>
                                Founder & CEO
                            </div>

                            <h3 className="hidden lg:block font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-4">Patel Man Nareshbhai</h3>

                            <p className="text-on-surface-variant text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-normal">
                                With a deep-rooted passion for agriculture and technology, I started Limbani Agro Market to bridge the gap between farmers and reliable equipment. My mission is to empower the Indian farming community by providing a transparent and efficient digital marketplace.
                            </p>

                            <div className="space-y-4">
                                <a 
                                    href="tel:+919023341592" 
                                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface hover:bg-primary/5 border border-outline-variant/30 transition-all group cursor-pointer"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-xl sm:text-2xl">call</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-on-surface-variant font-medium">Direct Phone / Call</p>
                                        <p className="text-on-surface font-title-md font-bold text-sm sm:text-base">+91 90233 41592</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface border border-outline-variant/30">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-xl sm:text-2xl">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-on-surface-variant font-medium">Location & Address</p>
                                        <p className="text-on-surface font-title-md font-bold text-xs sm:text-sm leading-snug">
                                            Madasana Kampa, Post Medhasan, Dist Arvalli
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetOurTeam;
