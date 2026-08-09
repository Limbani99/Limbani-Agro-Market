import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        location: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const payload = {
                name: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                role: "user", // Seller role
                address: {
                    city: formData.location
                }
            };

            const res = await axios.post(`${API_BASE_URL}/api/user/register`, payload);
            if (res.status === 200 || res.status === 201) {
                alert("Seller account created successfully!");
                navigate('/login');
            } else {
                alert(res.data?.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            alert(err.response?.data?.message || "Account registration failed.");
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden mt-15 pt-20 pb-12 bg-surface">
            {/* Background Image with Dark Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAopxn5Zb3qW4oFfQDyGrdfmw6GTuWdsp-ycKBkw68SnL_CZrUncAkJetQHMmpOzNvFjWfGhnJMxfDWM0HuSPB5xRdTd2EhRXBQkGhJ3VFSP8Nhx627PZe3SMmLtEM2f1_g1RGd4fZ7dZa35Cgr-_4Ek4U9y759CDUP9Dj5M9p1JS8rj7g4dhb8lrCrB_n4PF2OYyqYj32qGprjTyryHIu4AFU66rK20cdvqsC5JzZ9FS20S6ca195UTA"
                    alt="Agricultural Landscape"
                    className="w-full h-full object-cover scale-105 filter blur-xs"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-primary/40"></div>
            </div>

            {/* Register Card Container */}
            <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-auto">
                <div className="bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-xl rounded-3xl card-shadow border border-white/20 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Side: Farmer Image Banner */}
                    <div className="hidden lg:relative lg:flex flex-col justify-between p-10 overflow-hidden bg-surface-container">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo57NPp63tAu5Ukzyr7td4V_xcH7-3oiEHnG_k-rhYmCQx_OYvwTcQPv6YEqwT7ohBq-l9Douqnx4t8EzMu-_B3VbSjQkuMr2z88THzfT43H5eQvxqkcikZ4M9feakYSg8dK7jT8mlxFSVBZjuFwjzPh5cilU_w2M3zenKYqE6fllW3PSAYPMyFKbRjZhEAFLcU8af6KvyE_9AOCCE6mreyUcoa2nGH5HTphzTO1e-vRxwuoVTH7INag"
                            alt="Indian Farmer in Field"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"></div>

                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/30 text-white border border-white/20 font-bold text-xs backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">storefront</span> Seller Portal
                            </span>
                        </div>

                        <div className="relative z-10 text-white space-y-2">
                            <h2 className="font-display-lg text-2xl font-bold leading-tight">
                                Sell Your Agricultural Equipment & Machinery
                            </h2>
                            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                                Create your seller account to list tractors, harvesters, and tools for buyers across India.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Register Form */}
                    <div className="p-6 sm:p-10">

                        {/* Header / Brand Logo */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
                                <img src="/logo.png" alt="Limbani Agro Market Logo" className="w-10 h-10 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform" />
                                <span className="font-display-lg text-lg font-bold text-primary">Limbani Agro</span>
                            </Link>
                            <h1 className="font-display-lg text-2xl font-bold text-on-surface">Seller Registration</h1>
                            <p className="font-body-md text-xs text-on-surface-variant mt-1">Register to sell your farming equipment</p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-3.5">

                            {/* Full Name & Email Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1">Full Name *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">person</span>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="e.g. Ramesh Patel"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1">Email Address *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">mail</span>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="e.g. ramesh@gmail.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Number & Location Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1">Mobile Number *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">call</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="+91 90233 41592"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1">District / City *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">location_on</span>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            placeholder="e.g. Arvalli, Gujarat"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password & Confirm Password Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1">Password *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">lock</span>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            placeholder="Create password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-on-surface outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-on-surface mb-1">Confirm Password *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">lock_reset</span>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            required
                                            placeholder="Confirm password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-on-surface outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Terms & Conditions Checkbox */}
                            <div className="pt-1">
                                <label className="flex items-start gap-2 cursor-pointer text-xs text-on-surface-variant font-medium">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        required
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 accent-primary mt-0.5"
                                    />
                                    <span>I agree to Limbani Agro Market's <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> & <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a></span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-primary text-on-primary font-bold text-sm sm:text-base py-3 rounded-xl hover:bg-primary/90 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-3"
                            >
                                <span className="material-symbols-outlined text-[20px]">storefront</span> Register as Seller
                            </button>

                        </form>

                        {/* Sign In Link */}
                        <p className="text-center text-xs sm:text-sm text-on-surface-variant font-medium mt-5">
                            Already have a seller account?{' '}
                            <Link to="/login" className="font-bold text-primary hover:underline">
                                Seller Sign In
                            </Link>
                        </p>

                    </div>

                </div>
            </div>
        </main>
    );
};

export default Register;
