import React from 'react';

const DownloadApp = () => {
    return (
        <section className="py-20 bg-primary-container/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="bg-primary rounded-3xl p-8 md:p-12 lg:p-16 card-shadow grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    
                    <div className="relative z-10 text-on-primary">
                        <h2 className="font-display-md text-3xl md:text-5xl font-bold mb-6">Carry the Market in Your Pocket</h2>
                        <p className="font-body-lg text-lg text-white/90 mb-10">
                            Download the Limbani Agro Market app to buy, sell, and manage your equipment anytime, anywhere. Experience lightning-fast browsing and instant notifications.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button className="bg-surface text-primary font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-lowest transition-colors shadow-lg active:scale-95">
                                <span className="material-symbols-outlined text-3xl">android</span>
                                <div className="text-left">
                                    <div className="text-xs font-medium opacity-80">GET IT ON</div>
                                    <div className="text-lg leading-none">Google Play</div>
                                </div>
                            </button>
                            <button className="bg-surface text-primary font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-lowest transition-colors shadow-lg active:scale-95">
                                <span className="material-symbols-outlined text-3xl">phone_iphone</span>
                                <div className="text-left">
                                    <div className="text-xs font-medium opacity-80">Download on the</div>
                                    <div className="text-lg leading-none">App Store</div>
                                </div>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-md">
                                {/* Placeholder for QR Code */}
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://limbaniagro.com" alt="QR Code" className="w-full h-full" />
                            </div>
                            <div className="text-white/80 font-medium max-w-[150px]">
                                Scan to download the app directly
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex justify-center mt-8 md:mt-0">
                        {/* Placeholder for App Mockup */}
                        <div className="w-64 h-[500px] bg-surface rounded-[40px] border-[8px] border-surface-variant shadow-2xl relative overflow-hidden -mb-32">
                            <div className="absolute top-0 inset-x-0 h-6 bg-surface-variant rounded-b-xl flex justify-center">
                                <div className="w-16 h-3 bg-surface rounded-b-lg"></div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1592982537447-6f29efb06822?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="App UI" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                            <div className="absolute bottom-10 left-0 w-full text-center text-white font-bold text-2xl">Limbani Agro</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;
