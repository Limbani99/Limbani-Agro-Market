import React from 'react'

const CoreValues = () => {
    return (
        <section className="bg-surface-container-low py-16 md:py-24">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-12">
                    <h2 className="font-title-md text-3xl font-bold text-on-surface mb-4">Our Core Values</h2>
                    <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">The principles that guide our marketplace and ensure we deliver consistent value to the agricultural community.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-surface-container-lowest p-8 rounded-2xl card-shadow border border-surface-variant hover:-translate-y-2 transition-transform duration-300">
                        <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                        </div>
                        <h3 className="font-title-md text-xl font-bold text-on-surface mb-3">Trust & Transparency</h3>
                        <p className="font-body-md text-on-surface-variant">We believe in clear pricing, honest specifications, and fostering genuine relationships between buyers and sellers.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-8 rounded-2xl card-shadow border border-surface-variant hover:-translate-y-2 transition-transform duration-300">
                        <div className="bg-secondary-container/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-secondary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
                        </div>
                        <h3 className="font-title-md text-xl font-bold text-on-surface mb-3">Uncompromising Quality</h3>
                        <p className="font-body-md text-on-surface-variant">Every dealer on our platform undergoes rigorous verification to ensure they meet our strict quality standards.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-8 rounded-2xl card-shadow border border-surface-variant hover:-translate-y-2 transition-transform duration-300">
                        <div className="bg-[#128C7E]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-[#128C7E] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                        </div>
                        <h3 className="font-title-md text-xl font-bold text-on-surface mb-3">End-to-End Support</h3>
                        <p className="font-body-md text-on-surface-variant">From browsing to final purchase, our dedicated team is here to support you at every stage of your agricultural journey.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CoreValues