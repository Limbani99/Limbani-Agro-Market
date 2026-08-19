import React from 'react';
import { Link } from 'react-router-dom';

const DealerCard = ({ dealer }) => {
    const dealerId = dealer.id || dealer._id || 1;
    const phoneNum = dealer.phone || '';
    const cleanPhone = phoneNum.replace(/[^0-9]/g, '');
    const defaultImage = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80";

    return (
        <article className="bg-surface-container-lowest dark:bg-surface-container-low rounded-xl sm:rounded-3xl overflow-hidden card-shadow border border-outline-variant/40 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col group">
            {/* Image Header with Badges */}
            <Link to={`/dealer/${dealerId}`} className="h-32 sm:h-44 md:h-52 relative overflow-hidden bg-surface-container block group">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={dealer.name || "Dealer Profile"}
                    src={dealer.image || defaultImage}
                    onError={(e) => { e.target.src = defaultImage; }}
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Total Products Added Badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/80 backdrop-blur-md text-white border border-white/20 text-[9px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 font-bold shadow-md z-10 max-w-[90%] truncate">
                    <span className="material-symbols-outlined text-[12px] sm:text-[15px] text-primary shrink-0">inventory_2</span>
                    <span className="truncate">{dealer.listingsCount ?? 0} {dealer.listingsCount === 1 ? 'Product' : 'Products'}</span>
                </div>
            </Link>

            {/* Content Body */}
            <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Name & Rating */}
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                        <h3 className="font-display-md text-xs sm:text-base md:text-lg font-extrabold text-on-surface line-clamp-1 group-hover:text-primary transition-colors leading-tight">
                            {dealer.name}
                        </h3>
                        {dealer.rating && (
                            <div className="flex items-center gap-0.5 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-extrabold text-amber-600 dark:text-amber-400 shrink-0">
                                <span className="material-symbols-outlined text-[11px] sm:text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span>{dealer.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    {dealer.location ? (
                        <div className="flex items-center gap-0.5 text-[11px] sm:text-xs text-on-surface-variant font-medium mb-2 truncate">
                            <span className="material-symbols-outlined text-xs sm:text-sm text-primary shrink-0">location_on</span>
                            <span className="truncate">{dealer.location}</span>
                        </div>
                    ) : null}

                    {/* Verified & Experience Tags */}
                    <div className="flex flex-wrap items-center gap-1 mb-3">
                        {dealer.isVerified && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-bold text-[9px] sm:text-xs">
                                <span className="material-symbols-outlined text-[11px] sm:text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                Verified
                            </span>
                        )}
                        {dealer.yearsInBusiness ? (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface-container border border-outline-variant/30 text-on-surface-variant font-bold text-[9px] sm:text-xs">
                                <span className="material-symbols-outlined text-[11px] sm:text-[13px]">history</span>
                                {dealer.yearsInBusiness}+ Yrs
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="grid grid-cols-2 gap-1.5 pt-2.5 border-t border-outline-variant/20">
                    {phoneNum ? (
                        <>
                            <a
                                href={`tel:${phoneNum}`}
                                className="bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 hover:border-primary text-on-surface font-bold text-[11px] sm:text-xs py-1.5 sm:py-2 px-1 rounded-lg sm:rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-sm sm:text-base text-primary shrink-0">call</span>
                                <span>Call</span>
                            </a>

                            <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] font-bold text-[11px] sm:text-xs py-1.5 sm:py-2 px-1 rounded-lg sm:rounded-xl hover:bg-[#25D366]/20 active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm"
                            >
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                                </svg>
                                <span className="truncate">WhatsApp</span>
                            </a>
                        </>
                    ) : null}

                    <Link
                        to={`/dealer/${dealerId}`}
                        className="col-span-2 bg-primary text-on-primary font-bold text-[11px] sm:text-xs md:text-sm py-2 sm:py-2.5 px-1.5 rounded-lg sm:rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md mt-0.5 text-center"
                    >
                        <span className="material-symbols-outlined text-sm sm:text-base shrink-0">storefront</span>
                        <span className="truncate">Visit Dealership Store</span>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default DealerCard;
