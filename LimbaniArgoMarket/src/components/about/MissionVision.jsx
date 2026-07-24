import React from 'react';

const MissionVision = () => {
    const missions = [
        {
            icon: "eco",
            title: "Affordable Equipment",
            desc: "Make farming equipment affordable for every scale of operation."
        },
        {
            icon: "handshake",
            title: "Direct Connection",
            desc: "Connect buyers and sellers directly without unnecessary middlemen."
        },
        {
            icon: "storefront",
            title: "Dealer Support",
            desc: "Support and elevate trusted local dealers across the country."
        },
        {
            icon: "search_insights",
            title: "Simple Discovery",
            desc: "Make equipment discovery simple, fast, and highly intuitive."
        }
    ];

    return (
        <section className="py-20 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                
                {/* Vision Section */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-6 border border-primary/20 font-bold">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Our Vision
                    </div>
                    <h2 className="font-display-md text-3xl md:text-5xl font-bold text-on-surface leading-tight mb-8">
                        To become India's most trusted digital marketplace for agricultural equipment, helping every farmer access quality machinery with confidence.
                    </h2>
                </div>

                {/* Mission Section */}
                <div>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm mb-4 border border-secondary/20 font-bold">
                            <span className="material-symbols-outlined text-[16px]">flag</span>
                            Our Mission
                        </div>
                        <h3 className="font-title-lg text-3xl font-bold text-on-surface">What Drives Us Forward</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {missions.map((mission, idx) => (
                            <div key={idx} className="bg-surface p-8 rounded-2xl card-shadow border border-outline-variant/30 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-primary-container text-on-primary rounded-xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">{mission.icon}</span>
                                </div>
                                <h4 className="font-title-md text-xl font-bold text-on-surface mb-3">{mission.title}</h4>
                                <p className="text-on-surface-variant leading-relaxed">{mission.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;
