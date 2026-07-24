import React from 'react';

const EquipmentCard = ({ equipment }) => {
    return (
        <div className="bg-surface rounded-2xl card-shadow overflow-hidden group flex flex-col h-full border border-outline-variant/30">
            <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={equipment.image} alt={equipment.name} />
                {equipment.isFeatured && (
                    <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">star</span> Featured
                    </div>
                )}
                <div className="absolute top-2 right-2 glass-panel rounded-full p-1.5 cursor-pointer hover:bg-white/40 transition-colors">
                    <span className="material-symbols-outlined text-white">favorite</span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-title-md text-title-md text-on-surface line-clamp-2">{equipment.name}</h3>
                    {equipment.isVerified && (
                        <span className="glass-panel text-primary-container font-label-sm px-2 py-0.5 rounded text-xs ml-2 whitespace-nowrap border-primary/20">Verified</span>
                    )}
                </div>
                <p className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container mb-4">{equipment.price}</p>
                <div className="flex gap-4 mb-4 border-b border-outline-variant/20 pb-4">
                    <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Year</span>
                        <span className="font-body-md text-body-md text-on-surface font-medium">{equipment.year}</span>
                    </div>
                    <div className="w-px bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{equipment.hours ? 'Hours' : 'Width'}</span>
                        <span className="font-body-md text-body-md text-on-surface font-medium">{equipment.hours || equipment.width}</span>
                    </div>
                    <div className="w-px bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Condition</span>
                        <span className="font-body-md text-body-md text-on-surface font-medium">{equipment.condition}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-outline">location_on</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{equipment.location}</span>
                </div>
                <div className="mt-auto flex gap-2">
                    <button className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-2 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">call</span> Call
                    </button>
                    <button className="bg-[#25D366]/10 text-[#128C7E] font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center border border-[#25D366]/30">
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentCard;
