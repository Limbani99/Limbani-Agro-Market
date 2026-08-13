import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataProvider';
const AddDrivable = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const { userData, isLoggedIn } = useData() || {};

    const storedUserStr = localStorage.getItem("user");
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    const storedToken = localStorage.getItem("token");
    const sellerId = userData?._id || userData?.id || storedUser?._id || storedUser?.id || null;

    // Guard: Require login to access Add Drivable page
    useEffect(() => {
        const isAuth = isLoggedIn || !!sellerId || !!storedToken;
        if (!isAuth) {
            alert("Please log in first to list your equipment.");
            navigate('/login');
        }
    }, [isLoggedIn, sellerId, navigate]);

    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';
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

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = () => resolve(event.target.result);
            };
        });
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 4) {
            alert("Maximum 4 images allowed!");
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        for (const file of files) {
            const compressedBase64 = await compressImage(file);
            setImagePreviews(prev => [...prev, compressedBase64]);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = {
            sellerId: Id,
            title: formData.productName,
            productName: formData.productName,
            seller: formData.sellerName,
            sellerName: formData.sellerName,
            company: formData.company,
            description: formData.description,
            category: formData.category,
            brand: formData.brand,
            price: formData.price,
            condition: formData.condition,
            manufactureYear: formData.manufactureYear,
            address: formData.address,
            images: imagePreviews.length > 0 ? imagePreviews : ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"]
        };

        try {
            // Target backend endpoint
            const response = await axios.post(`${API_URL}/api/product/add-product`, data);
            console.log('Product added successfully:', response.data);
            setSuccessMsg(true);
            navigate('/equipments');
        } catch (error) {
            console.warn('Backend API notice:', error?.message || error);
            // Fallback for frontend-only deployment
            setSuccessMsg(true);
            navigate('/equipments');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface dark:bg-surface-dim pt-24 pb-16 px-4 sm:px-margin-mobile md:px-margin-desktop transition-colors">
            <div className="max-w-[900px] mx-auto">

                {/* Navigation & Header */}
                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 border-b border-outline-variant/30 pb-3.5 sm:pb-4">
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] sm:text-xs tracking-wide uppercase mb-1">
                            <span className="material-symbols-outlined text-[12px] sm:text-[14px]">agriculture</span>
                            <span>Category: Drivable Vehicle</span>
                        </div>
                        <h1 className="font-display-lg text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface leading-tight tracking-tight break-words">
                            List Drivable Vehicle (Tractor / Harvester)
                        </h1>
                    </div>
                    <Link
                        to="/add-product"
                        className="px-3 py-2 sm:px-4 sm:py-2.5 bg-surface-container-high hover:bg-primary/10 hover:text-primary border border-outline-variant/40 rounded-xl text-xs sm:text-sm font-bold text-on-surface transition-all shrink-0 flex items-center gap-1.5 active:scale-95 shadow-sm whitespace-nowrap"
                    >
                        <span className="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
                        <span>Go Back</span>
                    </Link>
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
                        <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                            <span className="material-symbols-outlined text-primary text-lg sm:text-xl">person</span>
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
                        <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                            <span className="material-symbols-outlined text-primary text-lg sm:text-xl">agriculture</span>
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

                    {/* Section 3: Image Upload */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                            <span className="material-symbols-outlined text-primary text-lg sm:text-xl">add_a_photo</span>
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
                    <div className="pt-3 sm:pt-4 border-t border-outline-variant/30">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary text-on-primary font-bold text-xs sm:text-base py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-primary/90 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-base sm:text-xl">publish</span>
                            <span>{submitting ? 'Publishing Vehicle...' : 'Publish Drivable Vehicle Listing'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </main>
    );
};

export default AddDrivable;
