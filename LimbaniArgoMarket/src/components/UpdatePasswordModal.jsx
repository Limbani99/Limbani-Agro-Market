import React, { useState } from 'react';

const UpdatePasswordModal = ({ isOpen, onClose, userId }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrorMsg('');

        if (!password || !confirmPassword) {
            setErrorMsg("Please fill in both password fields.");
            return;
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/user/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "Password updated successfully!");
                setPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    setMessage('');
                    onClose();
                }, 2000);
            } else {
                setErrorMsg(data.message || "Failed to update password.");
            }
        } catch (err) {
            console.error("Update Password Error:", err);
            setErrorMsg("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-surface-container-lowest dark:bg-surface-dim border border-outline-variant/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
                
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                            <span className="material-symbols-outlined text-xl">lock_reset</span>
                        </div>
                        <div>
                            <h3 className="font-display-md text-lg font-bold text-on-surface">Update Password</h3>
                            <p className="text-xs text-on-surface-variant">Set a new password for your account</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Feedback Banners */}
                {message && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-semibold text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        {message}
                    </div>
                )}

                {errorMsg && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-error/10 border border-error/20 text-error font-semibold text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        {errorMsg}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-on-surface mb-1.5">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter at least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-surface-container/50 border border-outline-variant/40 rounded-xl text-xs sm:text-sm font-medium text-on-surface outline-none focus:border-primary transition-all pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-on-surface mb-1.5">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-surface-container/50 border border-outline-variant/40 rounded-xl text-xs sm:text-sm font-medium text-on-surface outline-none focus:border-primary transition-all pr-10"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface font-bold text-xs hover:bg-surface-container-high active:scale-95 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-base">save</span>
                                    Update Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;
