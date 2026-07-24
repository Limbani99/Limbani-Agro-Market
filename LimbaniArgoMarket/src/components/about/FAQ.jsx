import React, { useState } from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "Is registration free?",
            answer: "Yes, registering an account on Limbani Agro Market is completely free for both buyers and sellers."
        },
        {
            question: "How do I contact sellers?",
            answer: "Once you open an equipment listing, you will see options to Call or WhatsApp the seller directly. We do not act as middlemen."
        },
        {
            question: "How can I become a dealer?",
            answer: "You can click on 'Become a Dealer' in the Partner section. We will ask for your business details and GST number for verification."
        },
        {
            question: "How do premium listings work?",
            answer: "Premium listings are featured at the top of search results and on the homepage, giving your equipment maximum visibility and a higher chance of selling faster."
        },
        {
            question: "Is equipment verified?",
            answer: "We verify the identities of our premium dealers. However, for individual sellers, we strongly advise buyers to inspect the equipment physically before making any payments."
        }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-20 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-12">
                    <h2 className="font-display-md text-3xl font-bold text-on-surface mb-4">Frequently Asked Questions</h2>
                    <p className="text-on-surface-variant">Got questions? We've got answers.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx} 
                            className={`border ${openIndex === idx ? 'border-primary bg-primary/5' : 'border-outline-variant/50 bg-surface'} rounded-xl overflow-hidden transition-colors`}
                        >
                            <button 
                                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                            >
                                <span className="font-title-md font-bold text-on-surface">{faq.question}</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : 'text-on-surface-variant'}`}>
                                    expand_more
                                </span>
                            </button>
                            <div 
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-on-surface-variant font-body-md">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
