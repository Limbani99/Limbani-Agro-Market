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
                        {/* Left Side: Details */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-6 border border-primary/20 font-bold w-fit">
                                <span className="material-symbols-outlined text-[16px]">engineering</span>
                                Founder & CEO
                            </div>

                            <h3 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-6">Patel Man Nareshbhai</h3>

                            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                                With a deep-rooted passion for agriculture and technology, I started Limbani Agro Market to bridge the gap between farmers and reliable equipment. My mission is to empower the Indian farming community by providing a transparent and efficient digital marketplace.
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-container text-primary rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">call</span>
                                    </div>
                                    <p className="text-on-surface font-title-md font-semibold">+91 90233 41592</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-container text-primary rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">location_on</span>
                                    </div>
                                    <p className="text-on-surface font-title-md font-semibold leading-snug">Madasana Kampa, Post Medhasan,<br />Dist Arvalli</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Image */}
                        <div className="relative h-[400px] lg:h-auto lg:min-h-[500px]">
                            <img
                                src="/founder.jpg"
                                alt="Patel Man Nareshbhai"
                                className="w-full h-full object-cover object-top"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetOurTeam;
