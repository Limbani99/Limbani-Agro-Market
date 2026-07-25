import React from 'react';
import { Link } from 'react-router-dom';

const EquipmentCard = ({ equipment }) => {
    return (
        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30 transition-all hover:border-primary/40">
            <Link to={`/equipment/${equipment.id}`} className="relative h-32 sm:h-44 md:h-48 bg-surface-container overflow-hidden block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={equipment.image} alt={equipment.name} />
                {equipment.isFeatured && (
                    <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">star</span> Featured
                    </div>
                )}
                <div className="absolute top-2 right-2 glass-panel rounded-full p-1.5 cursor-pointer hover:bg-white/40 transition-colors z-10">
                    <span className="material-symbols-outlined text-white text-[18px] sm:text-[20px]">favorite</span>
                </div>
            </Link>
            <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
                <Link to={`/equipment/${equipment.id}`} className="block group-hover:text-primary transition-colors">
                    <div className="flex justify-between items-start gap-1 mb-1">
                        <h3 className="font-title-md text-xs sm:text-base font-bold text-on-surface group-hover:text-primary line-clamp-1 sm:line-clamp-2 leading-snug">{equipment.name}</h3>
                        {equipment.isVerified && (
                            <span className="bg-primary/10 text-primary font-label-sm px-1.5 py-0.5 rounded text-[10px] sm:text-xs shrink-0 font-semibold border border-primary/20">Verified</span>
                        )}
                    </div>
                    
                    <p className="font-bold text-sm sm:text-lg text-primary mb-1 sm:mb-2">{equipment.price}</p>
                </Link>
                
                {/* Location - Visible on Mobile & Desktop */}
                <div className="flex items-center gap-0.5 text-[11px] sm:text-sm text-on-surface-variant mb-2 sm:mb-4">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-primary/80 shrink-0">location_on</span>
                    <span className="truncate">{equipment.location}</span>
                </div>

                {/* Specs - Hidden on tiny mobile grid, visible on sm and up */}
                <div className="hidden sm:flex gap-3 md:gap-4 mb-4 border-t border-b border-outline-variant/20 py-2.5">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-on-surface-variant">Year</span>
                        <span className="text-xs sm:text-sm text-on-surface font-semibold">{equipment.year}</span>
                    </div>
                    <div className="w-px bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                        <span className="text-[11px] text-on-surface-variant">{equipment.hours ? 'Hours' : 'Width'}</span>
                        <span className="text-xs sm:text-sm text-on-surface font-semibold">{equipment.hours || equipment.width}</span>
                    </div>
                    <div className="w-px bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                        <span className="text-[11px] text-on-surface-variant">Condition</span>
                        <span className="text-xs sm:text-sm text-on-surface font-semibold">{equipment.condition}</span>
                    </div>
                </div>

                <div className="mt-auto flex gap-1.5 sm:gap-2 pt-1">
                    <a href={`tel:${equipment.seller?.phone || '+919023341592'}`} className="flex-1 bg-primary text-on-primary font-bold text-xs sm:text-sm py-2 rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex justify-center items-center gap-1 sm:gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">call</span> Call
                    </a>
                    <a href={`https://wa.me/${equipment.seller?.whatsapp || '919023341592'}`} target="_blank" rel="noreferrer" className="bg-[#25D366]/10 text-[#128C7E] font-bold text-xs sm:text-sm px-2.5 sm:px-4 py-2 rounded-xl hover:bg-[#25D366]/20 active:scale-95 transition-all flex justify-center items-center border border-[#25D366]/30">
                        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">chat</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EquipmentCard;
