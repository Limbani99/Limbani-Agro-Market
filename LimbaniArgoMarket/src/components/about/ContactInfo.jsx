import React from 'react';

const ContactInfo = () => {
    return (
        <section className="py-20 bg-surface-container-lowest border-y border-outline-variant/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-6 border border-primary/20 font-bold">
                            <span className="material-symbols-outlined text-[16px]">contact_support</span>
                            Contact Us
                        </div>
                        <h2 className="font-display-md text-3xl md:text-5xl font-bold text-on-surface mb-6">We'd love to hear from you</h2>
                        <p className="text-on-surface-variant text-lg mb-12">Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.</p>
                        
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-container text-primary rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-2xl">location_on</span>
                                </div>
                                <div>
                                    <h4 className="font-title-md font-bold text-on-surface mb-1">Office Address</h4>
                                    <p className="text-on-surface-variant">Madasana Kampa, Post Medhasan<br/>Dist Arvalli, Gujarat, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-container text-primary rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-2xl">call</span>
                                </div>
                                <div>
                                    <h4 className="font-title-md font-bold text-on-surface mb-1">Phone & WhatsApp</h4>
                                    <p className="text-on-surface-variant">+91 90233 41592</p>
                                    <p className="text-sm text-on-surface-variant mt-1 text-secondary font-medium">Available Mon-Sat, 9am - 7pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-container text-primary rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-2xl">mail</span>
                                </div>
                                <div>
                                    <h4 className="font-title-md font-bold text-on-surface mb-1">Email</h4>
                                    <p className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">support@limbaniagro.com</p>
                                    <p className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">partnerships@limbaniagro.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-full min-h-[400px] w-full rounded-3xl overflow-hidden card-shadow border border-outline-variant/30 bg-surface-container relative">
                        {/* Placeholder for Google Maps iframe */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center">
                            <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm"></div>
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="material-symbols-outlined text-6xl text-primary drop-shadow-md">pin_drop</span>
                                <h3 className="font-title-lg font-bold text-on-surface mt-2 drop-shadow-md">Google Map Integration</h3>
                                <p className="text-on-surface-variant text-sm mt-1">Map placeholder</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactInfo;
