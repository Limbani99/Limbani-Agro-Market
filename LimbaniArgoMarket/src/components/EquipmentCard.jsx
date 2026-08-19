import React from 'react';
import { Link } from 'react-router-dom';

const getValidImageUrl = (img) => {
    if (!img || typeof img !== 'string') return "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80";
    if (img.startsWith('blob:')) return "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80";
    return img;
};

const EquipmentCard = ({ equipment, showContact = true }) => {
    const cardImage = getValidImageUrl(equipment?.image || equipment?.images?.[0]);

    return (
        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30 transition-all hover:border-primary/40">
            <Link to={`/equipment/${equipment.id}`} className="relative h-32 sm:h-44 md:h-48 bg-surface-container overflow-hidden block">
                <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={cardImage} 
                    alt={equipment.name} 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"; }}
                />
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
                        <h3 className="font-title-md text-xs sm:text-base font-extrabold text-on-surface group-hover:text-primary line-clamp-1 sm:line-clamp-2 leading-snug">{equipment.name}</h3>
                        {equipment.isVerified && (
                            <span className="bg-primary/10 text-primary font-label-sm px-1.5 py-0.5 rounded text-[9px] sm:text-xs shrink-0 font-bold border border-primary/20">Verified</span>
                        )}
                    </div>
                    
                    <p className="font-extrabold text-sm sm:text-lg text-primary mb-1">{equipment.price}</p>
                </Link>
                
                {/* Location */}
                <div className="flex items-center gap-0.5 text-[11px] sm:text-xs text-on-surface-variant font-medium mb-1.5 truncate">
                    <span className="material-symbols-outlined text-[13px] sm:text-[15px] text-primary shrink-0">location_on</span>
                    <span className="truncate">{equipment.location}</span>
                </div>

                {/* Specs Pills - Visible on Mobile & Desktop */}
                <div className="flex items-center gap-1 mb-3 text-[9px] sm:text-xs text-on-surface-variant font-semibold flex-wrap">
                    {equipment.year && (
                        <span className="bg-surface-container px-1.5 py-0.5 rounded-md border border-outline-variant/30">
                            {equipment.year}
                        </span>
                    )}
                    {equipment.hours && (
                        <span className="bg-surface-container px-1.5 py-0.5 rounded-md border border-outline-variant/30">
                            {equipment.hours}
                        </span>
                    )}
                    {equipment.condition && (
                        <span className="bg-surface-container px-1.5 py-0.5 rounded-md border border-outline-variant/30">
                            {equipment.condition}
                        </span>
                    )}
                </div>

                {showContact && (
                    <div className="mt-auto flex gap-1.5 sm:gap-2 pt-1">
                        <a href={`tel:${equipment.seller?.phone || '+919023341592'}`} className="flex-1 bg-primary text-on-primary font-bold text-xs sm:text-sm py-2 rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex justify-center items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">call</span> Call
                        </a>
                        <a href={`https://wa.me/${equipment.seller?.whatsapp || '919023341592'}`} target="_blank" rel="noreferrer" className="bg-[#25D366]/10 text-[#25D366] font-bold text-xs sm:text-sm px-2.5 sm:px-4 py-2 rounded-xl hover:bg-[#25D366]/20 active:scale-95 transition-all flex justify-center items-center border border-[#25D366]/30 shadow-sm">
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">chat</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentCard;
