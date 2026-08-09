import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddDrivable = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    // Form fields based on handwritten Image 1
    const [formData, setFormData] = useState({
        sellerName: '',
        company: '',
        productName: '',
        description: '',
        category: 'Tractor',
        brand: 'Mahindra',
        price: '',
        condition: 'Used',
        manufactureYear: '',
        address: '',
    });

    // Image previews up to 4 images
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 4) {
            alert("Maximum 4 images allowed!");
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setSubmitting(false);
            setSuccessMsg(true);
            setTimeout(() => {
                navigate('/equipments');
            }, 2000);
        }, 1200);
    };

    return (
        <main className="min-h-screen bg-surface dark:bg-surface-dim pt-24 pb-16 px-4 sm:px-margin-mobile md:px-margin-desktop transition-colors">
            <div className="max-w-[900px] mx-auto">

                {/* Navigation & Header */}
                <div className="flex items-center justify-between gap-4 mb-6 border-b border-outline-variant/30 pb-4">
                    <div className="flex items-center gap-3">
                        <Link to="/add-product" className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all">
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                        </Link>
                        <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-wide">Category: Drivable Vehicle</span>
                            <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
                                List Drivable Vehicle (Tractor / Harvester)
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Success Banner */}
                {successMsg && (
                    <div className="mb-6 p-4 rounded-2xl bg-primary-container text-on-primary font-bold flex items-center gap-3 shadow-lg animate-[fadeIn_0.2s_ease-out]">
                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                        <span>Your Drivable Vehicle listing has been published successfully! Redirecting...</span>
                    </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="bg-surface-container-lowest dark:bg-surface-container-low p-6 sm:p-10 rounded-3xl card-shadow border border-outline-variant/40 space-y-6">

                    {/* Section 1: Seller & Company Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            Seller Information
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Seller Name * */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Seller Name *</label>
                                <input
                                    type="text"
                                    name="sellerName"
                                    required
                                    placeholder="e.g. Patel Man Nareshbhai"
                                    value={formData.sellerName}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all"
                                />
                            </div>

                            {/* Company (Optional) */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Company / Dealership (Optional)</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="e.g. Limbani Agro Motors"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Vehicle Details */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                            <span className="material-symbols-outlined text-primary">agriculture</span>
                            Vehicle Details
                        </h2>

                        {/* Product Name * */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-1.5">Product / Vehicle Name *</label>
                            <input
                                type="text"
                                name="productName"
                                required
                                placeholder="e.g. Mahindra 575 DI 4WD Tractor"
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all"
                            />
                        </div>

                        {/* Category & Brand Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Category * */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all cursor-pointer"
                                >
                                    <option value="Tractor">Tractor</option>
                                    <option value="Combine Harvester">Combine Harvester</option>
                                    <option value="Mini Tractor">Mini Tractor</option>
                                    <option value="Commercial Vehicle">Commercial Vehicle</option>
                                </select>
                            </div>

                            {/* Brand * */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Brand / Manufacturer *</label>
                                <select
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all cursor-pointer"
                                >
                                    <option value="Mahindra">Mahindra</option>
                                    <option value="John Deere">John Deere</option>
                                    <option value="Swaraj">Swaraj</option>
                                    <option value="Sonalika">Sonalika</option>
                                    <option value="Kubota">Kubota</option>
                                    <option value="Massey Ferguson">Massey Ferguson</option>
                                    <option value="New Holland">New Holland</option>
                                    <option value="Escorts">Escorts</option>
                                    <option value="Other">Other Brand</option>
                                </select>
                            </div>
                        </div>

                        {/* Price, Condition, Manufacture Year Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Price * */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Asking Price (₹) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="e.g. 550000"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all"
                                />
                            </div>

                            {/* Condition * */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Condition *</label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all cursor-pointer"
                                >
                                    <option value="Used">Used / Pre-owned</option>
                                    <option value="New">Brand New</option>
                                </select>
                            </div>

                            {/* Manufacture Year (Optional) */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Manufacture Year (Optional)</label>
                                <input
                                    type="number"
                                    name="manufactureYear"
                                    placeholder="e.g. 2022"
                                    value={formData.manufactureYear}
                                    onChange={handleChange}
                                    className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Address / Location * */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-1.5">Location / Address *</label>
                            <input
                                type="text"
                                name="address"
                                required
                                placeholder="e.g. Madasana Kampa, Medhasan, Dist Arvalli, Gujarat"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all"
                            />
                        </div>

                        {/* Description (Optional) */}
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-1.5">Description & Details (Optional)</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder="Engine condition, tyre status, service history, documentation..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-surface border border-outline-variant/50 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 3: Image Upload (4 Images max as per handwritten note) */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                            <span className="material-symbols-outlined text-primary">add_a_photo</span>
                            Upload Photos (Max 4 Photos)
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {/* Uploaded Image Previews */}
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative h-28 rounded-2xl overflow-hidden border border-outline-variant/40 group shadow-sm">
                                    <img src={preview} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1.5 right-1.5 w-7 h-7 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}

                            {/* Add Photo Button Slot */}
                            {images.length < 4 && (
                                <label className="h-28 rounded-2xl border-2 border-dashed border-outline-variant/60 hover:border-primary bg-surface/50 hover:bg-primary/5 flex flex-col items-center justify-center cursor-pointer transition-all">
                                    <span className="material-symbols-outlined text-2xl text-primary mb-1">add_photo_alternate</span>
                                    <span className="text-xs font-bold text-on-surface-variant">Add Photo ({images.length}/4)</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-outline-variant/30">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary text-on-primary font-bold text-base py-4 rounded-2xl hover:bg-primary/90 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-xl">publish</span>
                            <span>{submitting ? 'Publishing Vehicle...' : 'Publish Drivable Vehicle Listing'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </main>
    );
};

export default AddDrivable;
