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
        <main className="min-h-screen bg-surface dark:bg-surface-dim pt-24 pb-16 px-4 sm:px-margin-mobile md:px-margin-desktop">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/30">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-1 border border-primary/20">
                            <span className="material-symbols-outlined text-sm">edit</span> Edit Listing
                        </div>
                        <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface">Update Equipment Details</h1>
                    </div>
                    <Link to="/profile" className="px-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-xs sm:text-sm font-bold text-on-surface hover:bg-surface-container-high transition-all">
                        Back to Profile
                    </Link>
                </div>

                {successMsg && (
                    <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        {successMsg}
                    </div>
                )}

                {errorMsg && (
                    <div className="mb-6 p-4 rounded-2xl bg-error/10 border border-error/20 text-error font-bold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">error</span>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 card-shadow space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-on-surface mb-2">Equipment Title / Name *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Mahindra 575 DI 45HP Tractor"
                            className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Category & Brand */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
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
                            <label className="block text-xs font-bold text-on-surface mb-2">Brand *</label>
                            <input
                                type="text"
                                name="brand"
                                required
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="e.g. Mahindra, Swaraj, John Deere"
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Price & Condition */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">Price (₹) *</label>
                            <input
                                type="text"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 4,50,000"
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">Condition *</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            >
                                <option value="Used">Used</option>
                                <option value="New">New</option>
                            </select>
                        </div>
                    </div>

                    {/* Manufacture Year & HP */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">Manufacture Year</label>
                            <input
                                type="text"
                                name="manufactureYear"
                                value={formData.manufactureYear}
                                onChange={handleChange}
                                placeholder="e.g. 2021"
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">Horse Power (HP)</label>
                            <input
                                type="text"
                                name="horsePower"
                                value={formData.horsePower}
                                onChange={handleChange}
                                placeholder="e.g. 45 HP"
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Location Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">District / City</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                placeholder="e.g. Rajkot"
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-2">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="e.g. Gujarat"
                                className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Address & Description */}
                    <div>
                        <label className="block text-xs font-bold text-on-surface mb-2">Full Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="e.g. Gondal Road, Near Marketing Yard, Rajkot"
                            className="w-full px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-on-surface mb-2">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe equipment condition, servicing details, RC papers..."
                            className="w-full p-4 bg-surface-container/50 rounded-2xl border border-outline-variant/40 text-sm outline-none focus:border-primary transition-colors resize-none"
                        ></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-xs font-bold text-on-surface mb-2">Equipment Photos (Max 5)</label>
                        <div className="flex flex-wrap gap-3 mb-3">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/40 bg-surface">
                                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {images.length < 5 && (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    id="edit-img-upload"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                <label
                                    htmlFor="edit-img-upload"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-container-high active:scale-95 transition-all"
                                >
                                    <span className="material-symbols-outlined text-base">add_a_photo</span>
                                    Add More Photos
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                        <Link
                            to="/profile"
                            className="px-6 py-3 rounded-2xl bg-surface-container border border-outline-variant text-on-surface font-bold text-sm hover:bg-surface-container-high transition-all"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
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
        </main>
    );
};

export default EditProduct;
