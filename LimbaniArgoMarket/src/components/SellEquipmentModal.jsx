import React, { useState } from 'react';

const SellEquipmentModal = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Tractors',
        price: '',
        year: new Date().getFullYear(),
        hoursOrWidth: '',
        condition: 'Excellent',
        location: '',
        phone: '',
        description: '',
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            setFormData(prev => ({ ...prev, image: url }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            if (onSubmitSuccess) onSubmitSuccess(formData);
            setIsSubmitted(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-surface rounded-3xl border border-outline-variant/30 card-shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 animate-[slideUp_0.25s_ease-out]">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {isSubmitted ? (
                    <div className="py-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 animate-bounce">
                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                        </div>
                        <h3 className="font-display-md text-2xl font-bold text-on-surface mb-2">Listing Submitted Successfully!</h3>
                        <p className="text-on-surface-variant max-w-md">Your equipment has been submitted for review. It will be live on Limbani Agro Market shortly.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 border-b border-outline-variant/20 pb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-2 border border-primary/20 font-bold">
                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                Sell Equipment
                            </div>
                            <h2 className="font-display-md text-2xl sm:text-3xl font-bold text-on-surface">Post Your Machinery Listing</h2>
                            <p className="text-on-surface-variant text-sm mt-1">Reach thousands of buyers across India with zero commission.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            
                            {/* Equipment Name & Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Equipment Name / Model *</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        required 
                                        placeholder="e.g. Mahindra 575 DI"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Category *</label>
                                    <select 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors cursor-pointer"
                                    >
                                        <option value="Tractors">Tractor</option>
                                        <option value="Mini Tractor">Mini Tractor</option>
                                        <option value="Rotavator">Rotavator</option>
                                        <option value="Cultivator">Cultivator</option>
                                        <option value="Plough">Plough</option>
                                        <option value="Harvester">Harvester</option>
                                        <option value="Trailer">Trailer</option>
                                        <option value="Other">Other Machinery</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price & Year */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Asking Price (₹) *</label>
                                    <input 
                                        type="text" 
                                        name="price" 
                                        required 
                                        placeholder="e.g. 6,50,000"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Manufacturing Year *</label>
                                    <input 
                                        type="number" 
                                        name="year" 
                                        required 
                                        min="2000"
                                        max={new Date().getFullYear()}
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Hours/Width & Condition */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Hours Used or Width *</label>
                                    <input 
                                        type="text" 
                                        name="hoursOrWidth" 
                                        required 
                                        placeholder="e.g. 1500 hours or 6 ft"
                                        value={formData.hoursOrWidth}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Condition *</label>
                                    <select 
                                        name="condition" 
                                        value={formData.condition} 
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors cursor-pointer"
                                    >
                                        <option value="Like New">Like New</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Location (District & State) *</label>
                                    <input 
                                        type="text" 
                                        name="location" 
                                        required 
                                        placeholder="e.g. Rajkot, Gujarat"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Contact Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        required 
                                        placeholder="e.g. +91 90233 41592"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Description & Details</label>
                                <textarea 
                                    name="description" 
                                    rows="3" 
                                    placeholder="Describe your tractor/equipment condition, engine health, service history, documentation..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                                ></textarea>
                            </div>

                            {/* Image Upload Area */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Upload Photos</label>
                                <div className="border-2 border-dashed border-outline-variant/50 hover:border-primary/50 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-surface-container-lowest relative">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                    />
                                    {imagePreview ? (
                                        <div className="flex flex-col items-center">
                                            <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-lg mb-2" />
                                            <p className="text-xs text-primary font-bold">Click to change photo</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center py-2">
                                            <span className="material-symbols-outlined text-3xl text-primary/70 mb-1">add_a_photo</span>
                                            <p className="text-xs font-bold text-on-surface">Click to upload photos from your device</p>
                                            <p className="text-[11px] text-on-surface-variant">Supports JPG, PNG up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg text-base flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined">send</span> Post Machinery Listing
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default SellEquipmentModal;
