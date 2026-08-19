import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataProvider';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useData();
    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        category: 'Tractor',
        brand: 'Mahindra',
        price: '',
        condition: 'Used',
        manufactureYear: '',
        horsePower: '',
        fuelType: 'Diesel',
        state: '',
        district: '',
        village: '',
        address: '',
        description: '',
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/product/get-product-by-id/${id}`);
                const data = res.data?.product || res.data;
                if (data) {
                    setFormData({
                        title: data.title || data.productName || data.name || '',
                        category: data.category || 'Tractor',
                        brand: data.brand || 'Mahindra',
                        price: data.price || '',
                        condition: data.condition || 'Used',
                        manufactureYear: data.manufactureYear || data.year || '',
                        horsePower: data.horsePower || '',
                        fuelType: data.fuelType || 'Diesel',
                        state: data.state || data.address?.state || '',
                        district: data.district || data.address?.district || '',
                        village: data.village || data.address?.village || '',
                        address: typeof data.address === 'string' ? data.address : (data.address?.address || ''),
                        description: data.description || '',
                    });
                    if (data.images && Array.isArray(data.images)) {
                        setImages(data.images);
                    } else if (data.image) {
                        setImages([data.image]);
                    }
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setErrorMsg("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

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
                    resolve(canvas.toDataURL('image/jpeg', 0.75));
                };
            };
        });
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const compressedList = await Promise.all(files.map(file => compressImage(file)));
        setImages(prev => [...prev, ...compressedList].slice(0, 5));
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, idx) => idx !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMsg('');
        setErrorMsg('');

        try {
            const payload = {
                title: formData.title,
                productName: formData.title,
                category: formData.category,
                brand: formData.brand,
                price: formData.price,
                condition: formData.condition,
                manufactureYear: formData.manufactureYear,
                horsePower: formData.horsePower,
                fuelType: formData.fuelType,
                state: formData.state,
                district: formData.district,
                village: formData.village,
                address: formData.address,
                description: formData.description,
                images: images
            };

            await axios.put(`${API_URL}/api/product/update-product/${id}`, payload);
            setSuccessMsg('Product updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (err) {
            console.error("Update product error:", err);
            setErrorMsg(err.response?.data?.message || 'Failed to update product. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="w-full pt-[76px] pb-20 min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-3"></div>
                <p className="text-on-surface-variant text-sm font-medium">Loading product details...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface dark:bg-surface-dim pt-24 pb-16 px-3 sm:px-margin-mobile md:px-margin-desktop">
            <div className="max-w-6xl mx-auto">

                {/* Header Action Bar */}
                <div className="flex items-center justify-between gap-3 mb-6 p-4 sm:p-6 bg-surface-container-lowest rounded-2xl sm:rounded-3xl border border-outline-variant/30 card-shadow">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-xl sm:text-2xl">edit</span>
                        </div>
                        <div className="min-w-0">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] sm:text-xs tracking-wide uppercase mb-1">
                                <span>Edit Listing</span>
                            </div>
                            <h1 className="font-display-lg text-lg sm:text-2xl font-extrabold text-on-surface truncate">
                                Update Equipment Details
                            </h1>
                        </div>
                    </div>

                    <Link
                        to="/profile"
                        className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold text-on-surface transition-all shrink-0 flex items-center gap-1 active:scale-95 shadow-sm whitespace-nowrap"
                    >
                        <span className="material-symbols-outlined text-[10px] sm:text-[12px]">arrow_back</span>
                        <span>Go Back</span>
                    </Link>
                </div>

                {successMsg && (
                    <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm flex items-center gap-2.5 shadow-sm">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        {successMsg}
                    </div>
                )}

                {errorMsg && (
                    <div className="mb-6 p-4 rounded-2xl bg-error/10 border border-error/20 text-error font-bold text-sm flex items-center gap-2.5 shadow-sm">
                        <span className="material-symbols-outlined text-xl">error</span>
                        {errorMsg}
                    </div>
                )}

                {/* Laptop & Desktop Dual-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* Left Column: Live Equipment Preview Sidebar (Laptop/Desktop) */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Live Card Preview */}
                        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow overflow-hidden group">
                            <div className="relative h-48 sm:h-56 bg-surface-container overflow-hidden block">
                                {images.length > 0 ? (
                                    <img
                                        src={images[0]}
                                        alt={formData.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-outline bg-surface-container">
                                        <span className="material-symbols-outlined text-4xl mb-1">agriculture</span>
                                        <span className="text-xs font-bold">No Image Uploaded</span>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-sm">star</span> Preview
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="font-title-md text-base font-extrabold text-on-surface line-clamp-2 leading-snug">
                                        {formData.title || 'Equipment Title'}
                                    </h3>
                                    <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-xs shrink-0 border border-primary/20">
                                        {formData.condition || 'Used'}
                                    </span>
                                </div>

                                <p className="font-extrabold text-xl text-primary mb-2">
                                    {formData.price ? `₹${formData.price}` : 'Price'}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium mb-3 truncate">
                                    <span className="material-symbols-outlined text-sm text-primary shrink-0">location_on</span>
                                    <span className="truncate">{[formData.district, formData.state].filter(Boolean).join(', ') || 'Location'}</span>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold flex-wrap pt-2 border-t border-outline-variant/20">
                                    {formData.brand && (
                                        <span className="bg-surface-container px-2 py-1 rounded-md border border-outline-variant/30">
                                            {formData.brand}
                                        </span>
                                    )}
                                    {formData.manufactureYear && (
                                        <span className="bg-surface-container px-2 py-1 rounded-md border border-outline-variant/30">
                                            {formData.manufactureYear}
                                        </span>
                                    )}
                                    {formData.horsePower && (
                                        <span className="bg-surface-container px-2 py-1 rounded-md border border-outline-variant/30">
                                            {formData.horsePower} HP
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery Upload Card */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-outline-variant/30 card-shadow space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-title-md text-sm font-extrabold text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base text-primary">photo_library</span> Equipment Photos ({images.length}/5)
                                </h3>
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-3 gap-2.5">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-outline-variant/40 bg-surface shadow-sm group">
                                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md cursor-pointer hover:scale-110 transition-transform"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <label
                                        htmlFor="edit-img-upload-sidebar"
                                        className="aspect-square rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 flex flex-col items-center justify-center text-primary cursor-pointer transition-all text-center p-1"
                                    >
                                        <span className="material-symbols-outlined text-xl">add_a_photo</span>
                                        <span className="text-[10px] font-bold mt-0.5">Add</span>
                                    </label>
                                )}
                            </div>

                            {images.length < 5 && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    id="edit-img-upload-sidebar"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            )}
                        </div>

                    </div>

                    {/* Right Column: Update Form Main Area */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-5 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-6">

                            {/* Section 1: General Info */}
                            <div className="space-y-4">
                                <h3 className="font-title-md text-sm font-extrabold text-on-surface pb-2 border-b border-outline-variant/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base text-primary">info</span> Basic Information
                                </h3>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Equipment Title / Name *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Mahindra 575 DI 45HP Tractor"
                                        className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors cursor-pointer"
                                        >
                                            <option value="Tractor">Tractor</option>
                                            <option value="Rotavator">Rotavator</option>
                                            <option value="Harvester">Harvester</option>
                                            <option value="Thresher">Thresher</option>
                                            <option value="Plough">Plough</option>
                                            <option value="Cultivator">Cultivator</option>
                                            <option value="Seeder">Seeder</option>
                                            <option value="Implements">Implements</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Brand *</label>
                                        <input
                                            type="text"
                                            name="brand"
                                            required
                                            value={formData.brand}
                                            onChange={handleChange}
                                            placeholder="e.g. Mahindra, Swaraj, John Deere"
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Price (₹) *</label>
                                        <input
                                            type="text"
                                            name="price"
                                            required
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="e.g. 4,50,000"
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Condition *</label>
                                        <select
                                            name="condition"
                                            value={formData.condition}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors cursor-pointer"
                                        >
                                            <option value="Used">Used</option>
                                            <option value="New">New</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Manufacture Year</label>
                                        <input
                                            type="text"
                                            name="manufactureYear"
                                            value={formData.manufactureYear}
                                            onChange={handleChange}
                                            placeholder="e.g. 2021"
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">Horse Power (HP)</label>
                                        <input
                                            type="text"
                                            name="horsePower"
                                            value={formData.horsePower}
                                            onChange={handleChange}
                                            placeholder="e.g. 45 HP"
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Location & Address */}
                            <div className="space-y-4 pt-2">
                                <h3 className="font-title-md text-sm font-extrabold text-on-surface pb-2 border-b border-outline-variant/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base text-primary">location_on</span> Location Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">District / City</label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            placeholder="e.g. Rajkot"
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-on-surface mb-1.5">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="e.g. Gujarat"
                                            className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Full Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="e.g. Gondal Road, Near Marketing Yard, Rajkot"
                                        className="w-full px-4 py-3 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Section 3: Description */}
                            <div className="space-y-4 pt-2">
                                <h3 className="font-title-md text-sm font-extrabold text-on-surface pb-2 border-b border-outline-variant/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base text-primary">description</span> Detailed Description
                                </h3>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1.5">Equipment Condition & Notes</label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe equipment condition, servicing details, RC papers, tyre condition..."
                                        className="w-full p-4 bg-surface-container/40 rounded-xl border border-outline-variant/40 text-xs sm:text-sm font-medium text-on-surface outline-none focus:border-primary transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Form Submit & Cancel Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                                <Link
                                    to="/profile"
                                    className="px-6 py-3 rounded-xl bg-surface-container border border-outline-variant text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container-high active:scale-95 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg">save</span>
                                            Update Equipment
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default EditProduct;
