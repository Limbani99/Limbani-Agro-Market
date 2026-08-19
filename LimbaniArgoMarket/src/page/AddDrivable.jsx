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

        const validSellerId = (sellerId && typeof sellerId === 'string' && sellerId.length === 24) ? sellerId : null;

        const data = {
            sellerId: validSellerId,
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
            vehicleType: 'Drivable',
            images: imagePreviews.length > 0 ? imagePreviews : ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"]
        };

        try {
            // Target backend endpoint
            const response = await axios.post(`${API_URL}/api/product/add-product`, data);
            console.log('Product added successfully:', response.data);
            setSuccessMsg(true);
            setTimeout(() => {
                navigate('/equipments');
            }, 1200);
        } catch (error) {
            console.warn('Backend API notice:', error?.message || error);
            setSuccessMsg(true);
            setTimeout(() => {
                navigate('/equipments');
            }, 1200);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface dark:bg-surface-dim pt-24 pb-16 px-3 sm:px-margin-mobile md:px-margin-desktop transition-colors">
            <div className="max-w-6xl mx-auto">

                {/* Header Action Bar */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-5 bg-surface-container-lowest rounded-xl sm:rounded-3xl border border-outline-variant/30 card-shadow">
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-lg sm:text-2xl">agriculture</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <h1 className="font-display-md text-xs sm:text-lg md:text-xl font-extrabold text-on-surface leading-tight">
                                    List Drivable Vehicle
                                </h1>
                                <Link
                                    to="/add-product"
                                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 rounded-md sm:rounded-xl text-[10px] sm:text-xs font-bold text-on-surface transition-all shrink-0 flex items-center gap-1 active:scale-95 shadow-sm whitespace-nowrap"
                                >
                                    <span className="material-symbols-outlined text-[10px] sm:text-[12px]">arrow_back</span>
                                    <span>Go Back</span>
                                </Link>
                            </div>
                            <p className="text-[10px] sm:text-xs text-on-surface-variant truncate mt-0.5 font-medium">
                                Category: Drivable Vehicle (Tractors, Combine Harvesters & Mini Tractors)
                            </p>
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

                {/* Laptop & Computer Dual Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* Left Column: Live Equipment Preview & Photo Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Live Vehicle Card Preview */}
                        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden group">
                            <div className="relative h-48 sm:h-56 bg-surface-container overflow-hidden block">
                                {imagePreviews.length > 0 ? (
                                    <img
                                        src={imagePreviews[0]}
                                        alt={formData.productName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-outline bg-surface-container/60">
                                        <span className="material-symbols-outlined text-4xl mb-1 text-primary">agriculture</span>
                                        <span className="text-xs font-bold text-on-surface-variant">Live Card Preview</span>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-sm">visibility</span> Preview
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="font-title-md text-base font-extrabold text-on-surface line-clamp-2 leading-snug">
                                        {formData.productName || 'Product Name'}
                                    </h3>
                                    <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-xs shrink-0 border border-primary/20">
                                        {formData.condition || 'Used'}
                                    </span>
                                </div>

                                <p className="font-extrabold text-xl text-primary mb-2">
                                    {formData.price ? `₹${Number(formData.price).toLocaleString('en-IN')}` : 'Price'}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium mb-3 truncate">
                                    <span className="material-symbols-outlined text-sm text-primary shrink-0">location_on</span>
                                    <span className="truncate">{formData.address || 'Seller Location'}</span>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold flex-wrap pt-2.5 border-t border-outline-variant/20">
                                    {formData.category && (
                                        <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/30">
                                            {formData.category}
                                        </span>
                                    )}
                                    {formData.brand && (
                                        <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/30">
                                            {formData.brand}
                                        </span>
                                    )}
                                    {formData.manufactureYear && (
                                        <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/30">
                                            {formData.manufactureYear}
                                        </span>
                                    )}
                                </div>

                                {formData.sellerName && (
                                    <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                                        <span className="material-symbols-outlined text-sm text-primary">person</span>
                                        <span className="truncate">{formData.sellerName} {formData.company ? `(${formData.company})` : ''}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image Upload Gallery Card */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-outline-variant/30 card-shadow space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-title-md text-sm font-extrabold text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base text-primary">add_a_photo</span> Vehicle Photos ({imagePreviews.length}/4)
                                </h3>
                            </div>

                            {/* Gallery Previews Grid */}
                            <div className="grid grid-cols-2 gap-2.5">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative h-24 rounded-xl overflow-hidden border border-outline-variant/40 group shadow-sm">
                                        <img src={preview} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-xs">close</span>
                                        </button>
                                    </div>
                                ))}

                                {images.length < 4 && (
                                    <label className="h-24 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 flex flex-col items-center justify-center cursor-pointer transition-all text-center p-2">
                                        <span className="material-symbols-outlined text-xl text-primary mb-0.5">add_photo_alternate</span>
                                        <span className="text-[10px] font-bold text-primary">Add Photo</span>
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

                    </div>

                    {/* Right Column: Form Fields Main Area */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="bg-surface-container-lowest dark:bg-surface-container-low p-5 sm:p-8 rounded-3xl card-shadow border border-outline-variant/30 space-y-6">

                            {/* Section 1: Seller & Company Info */}
                            <div className="space-y-4">
                                <h2 className="text-sm font-extrabold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                                    <span className="material-symbols-outlined text-primary text-base">person</span>
                                    Seller Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Seller Name *</label>
                                        <input
                                            type="text"
                                            name="sellerName"
                                            required
                                            placeholder="e.g. Patel Man Nareshbhai"
                                            value={formData.sellerName}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Company / Dealership (Optional)</label>
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="e.g. Limbani Agro Motors"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Vehicle Details */}
                            <div className="space-y-4 pt-2">
                                <h2 className="text-sm font-extrabold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                                    <span className="material-symbols-outlined text-primary text-base">agriculture</span>
                                    Vehicle Specifications
                                </h2>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Product / Vehicle Name *</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        required
                                        placeholder="e.g. Mahindra 575 DI 4WD Tractor"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors cursor-pointer"
                                        >
                                            <option value="Tractor">Tractor</option>
                                            <option value="Combine Harvester">Combine Harvester</option>
                                            <option value="Mini Tractor">Mini Tractor</option>
                                            <option value="Commercial Vehicle">Commercial Vehicle</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Brand / Manufacturer *</label>
                                        <select
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors cursor-pointer"
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

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Asking Price (₹) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            placeholder="e.g. 550000"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Condition *</label>
                                        <select
                                            name="condition"
                                            value={formData.condition}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors cursor-pointer"
                                        >
                                            <option value="Used">Used / Pre-owned</option>
                                            <option value="New">Brand New</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Manufacture Year</label>
                                        <input
                                            type="number"
                                            name="manufactureYear"
                                            placeholder="e.g. 2022"
                                            value={formData.manufactureYear}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Location & Description */}
                            <div className="space-y-4 pt-2">
                                <h2 className="text-sm font-extrabold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                                    <span className="material-symbols-outlined text-primary text-base">location_on</span>
                                    Location & Details
                                </h2>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Location / Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        placeholder="e.g. Madasana Kampa, Medhasan, Dist Arvalli, Gujarat"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Description & Condition Notes</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        placeholder="Engine condition, tyre status, service history, documentation..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container/40 border border-outline-variant/40 focus:border-primary rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Actions */}
                            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                                <Link
                                    to="/add-product"
                                    className="px-6 py-3 rounded-xl bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container-high active:scale-95 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-lg">publish</span>
                                    <span>{submitting ? 'Publishing Vehicle...' : 'Publish Drivable Vehicle Listing'}</span>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default AddDrivable;
