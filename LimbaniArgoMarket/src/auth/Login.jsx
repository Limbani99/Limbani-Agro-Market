import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataProvider';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useData();
    const [loginMethod, setLoginMethod] = useState('phone');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        phoneOrEmail: '',
        password: '',
        rememberMe: false
    });

    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                email: formData.phoneOrEmail,
                password: formData.password
            };

            const response = await axios.post(`${API_URL}/api/user/login`, payload);
            if (response.status === 200) {
                if (login) {
                    login(response.data.user, response.data.token);
                } else {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                }
                alert('Login successful!');
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
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

            {/* Login Card Container */}
            <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-auto">
                <div className="bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-xl rounded-3xl card-shadow border border-white/20 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Side: Farmer Image Banner */}
                    <div className="hidden lg:relative lg:flex flex-col justify-between p-10 overflow-hidden bg-surface-container">
                        <img
                            src="https://i.pinimg.com/1200x/d6/ed/4d/d6ed4d80b0ea2c7ab9c7ba78d7b7b818.jpg"
                            alt="Indian Farmer in Agricultural Field"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"></div>

                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/30 text-white border border-white/20 font-bold text-xs backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">agriculture</span> Empowering Indian Agriculture
                            </span>
                        </div>

                        <div className="relative z-10 text-white space-y-2">
                            <h2 className="font-display-lg text-2xl font-bold leading-tight">
                                Connecting Farmers & Dealers Across India
                            </h2>
                            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                                Buy, sell, and discover top-quality farming machinery with zero hidden commission.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Login Form */}
                    <div className="p-6 sm:p-10">

                        {/* Header / Brand Logo */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
                                <img src="/logo.png" alt="Limbani Agro Market Logo" className="w-12 h-12 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform" />
                                <span className="font-display-lg text-xl font-bold text-primary">Limbani Agro</span>
                            </Link>
                            <h1 className="font-display-lg text-2xl sm:text-3xl font-bold text-on-surface">Seller Sign In</h1>
                            <p className="font-body-md text-sm text-on-surface-variant mt-1">Sign in to manage your equipment listings & sales</p>
                        </div>

                        {/* Method Toggle: Phone or Email */}
                        <div className="flex bg-surface-container p-1 rounded-2xl mb-6 border border-outline-variant/30">
                            <button
                                type="button"
                                onClick={() => setLoginMethod('phone')}
                                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${loginMethod === 'phone' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">call</span> Mobile Number
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginMethod('email')}
                                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${loginMethod === 'email' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">mail</span> Email Address
                            </button>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Phone / Email Input */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    {loginMethod === 'phone' ? 'Mobile Number *' : 'Email Address *'}
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                                        {loginMethod === 'phone' ? 'call' : 'mail'}
                                    </span>
                                    <input
                                        type={loginMethod === 'phone' ? 'tel' : 'email'}
                                        name="phoneOrEmail"
                                        required
                                        placeholder={loginMethod === 'phone' ? '+91 90233 41592' : 'farmer@limbaniagro.com'}
                                        value={formData.phoneOrEmail}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-2xl pl-11 pr-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">Password *</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                                        lock
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-2xl pl-11 pr-11 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-xs pt-1">
                                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant font-medium">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 accent-primary"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="font-bold text-primary hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-primary text-on-primary font-bold text-base py-3.5 rounded-2xl hover:bg-primary/90 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                            >
                                <span className="material-symbols-outlined text-[20px]">login</span> Sign In
                            </button>

                        </form>

                        {/* Footer / Sign Up Link */}
                        <p className="text-center text-xs sm:text-sm text-on-surface-variant font-medium mt-6">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-primary hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Login;
