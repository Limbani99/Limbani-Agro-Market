import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Ramesh Kumar",
            location: "Punjab",
            rating: 5,
            review: "I sold my old tractor within 3 days of listing it on Limbani Agro Market. The direct WhatsApp feature makes negotiation so easy. Highly recommended for every farmer!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Sanjay Patel",
            location: "Gujarat",
            rating: 5,
            review: "Bought a rotavator from a verified dealer near my village. The machine was exactly as shown in the photos, and I saved almost 30% compared to a new one.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Amit Singh",
            location: "Haryana",
            rating: 4,
            review: "Very transparent platform. No hidden commissions. You just pay the seller directly. It's truly a platform made for the benefit of Indian farmers.",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];

    return (
        <section className="py-20 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-16">
                    <h2 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-4">What Farmers Say</h2>
                    <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Real experiences from farmers who have successfully bought and sold equipment on our platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="bg-surface p-8 rounded-3xl card-shadow border border-outline-variant/30 flex flex-col relative mt-8">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-surface overflow-hidden shadow-md">
                                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="pt-10 flex-1 flex flex-col">
                                <div className="flex justify-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-[#FFB400]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    ))}
                                </div>
                                <p className="text-on-surface-variant italic text-center mb-6 flex-1">"{testimonial.review}"</p>
                                <div className="text-center border-t border-outline-variant/30 pt-4">
                                    <h4 className="font-title-md font-bold text-on-surface">{testimonial.name}</h4>
                                    <p className="text-sm text-on-surface-variant">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
