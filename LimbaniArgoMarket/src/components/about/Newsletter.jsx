import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-24 bg-surface">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-primary mb-6">mark_email_unread</span>
                    <h2 className="font-display-md text-3xl md:text-5xl font-bold text-on-surface mb-6">Stay Updated With New Equipment Listings</h2>
                    <p className="text-on-surface-variant text-lg mb-10">Subscribe to our newsletter and be the first to know about massive discounts, premium dealer joins, and the latest agricultural machinery in your area.</p>
                    
                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface bg-surface-container-lowest"
                                required 
                            />
                        </div>
                        <button type="submit" className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-md active:scale-95 whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-on-surface-variant text-sm mt-4">We care about your data in our <a href="#" className="text-primary hover:underline">privacy policy</a>.</p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
