import React, { useState } from 'react';
import EquipmentCard from '../components/EquipmentCard';

const equipmentsData = [
    {
        id: 1,
        name: "John Deere 5310 2WD",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWZdxf5cvj3b_9VwOd3Dbza4PsAK0fJJXyR-UCUq_eJ-BLoH4mmeHeDors6hfB1JEJa1vycR9ICZpadTl84sBzrPUAchTCJeakj_D2ooZeOh3u4EbNn8t0-_uvathQlyJHs4FoG5la9itO2dG1cU1pJ39kjZdFPB0uHUb5Wdjlo6eDyFQ55Nnw3vFiFhDULsXVebuNYh5PQJqbs0k3XwnlcDw_IRSTjK9pNkr0MRU5atzLChtUuDdQtQ",
        price: "₹ 7,50,000",
        year: 2021,
        hours: "1200 h",
        condition: "Excellent",
        location: "Ludhiana, Punjab",
        isFeatured: true,
        isVerified: true
    },
    {
        id: 2,
        name: "Mahindra Arjun Novo 605 DI-i",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5XPRPvkVkohXEVxl_ItBTDQQJYEZi4g543jqkFumzyTS2LtnKaK2-8mJkc-Eyp5JpcPyIKwfsR8VC_VcRY7KFfsAUrojHUdeM4gslsfX3i8O8PFA7itvQQW8SlvZmowdxALLwTzsV2Qi1lwEBrIflwyRE8fEuVDaAFI_EB39Rx85_jc3vU7epTE3ZsOYWa8IHzv6KXPY6Znn3ANAhw2fCrUXCOX1ph5Dp1g_sI7A-Gy_C4zKoaY8KkA",
        price: "₹ 6,80,000",
        year: 2019,
        hours: "2500 h",
        condition: "Good",
        location: "Rajkot, Gujarat",
        isFeatured: false,
        isVerified: false
    },
    {
        id: 3,
        name: "Shaktiman Regular Light Rotavator",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrlfPS9tK3o4_1WLmzz_bZdYmcbVGnRL3_4ZG7h6gj03ozZdCJ3GtVbrPwuoSG1TmUiGOKaM5Ni7htsjcpYEoM2IBOnGreNohRHolNN9z0W6xczrwY11CuqmCWsqAg002u5dHcX5lSsNIjZ25bUL9I54IJDbh9RsNYI48UDEfQ4TvEGqUVAnPZoyd2YYAMWupVpIZPdq4-OqwDHztYfDuRlbKfM3X3fZdyyXqhjiyASOV6fqh87B-12Q",
        price: "₹ 95,000",
        year: 2022,
        width: "6 ft",
        condition: "Like New",
        location: "Pune, Maharashtra",
        isFeatured: false,
        isVerified: false
    },
    {
        id: 4,
        name: "Preet 987 Combine Harvester",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtY9yDD4nf6bMGZosv0v_WTBSVvER9zP71sqxIGkk7LSIwrb5F9W24KqRFzVqRTCxXDLQiu_hsZdYmS-wZm-b3MhGig04LiQYEt7nDUhaufix6CABQzR3oRLGSk7Qj5k7mdsviET4_HF_U4jfTssOodUJ4NeNbc3U4JW-8LiR65OpodDVi1PaQUhD0IQ9AxPPZBahAuIDTQpm_zLjuti1vgaOIf2tsWZ_uHfiPx7E74ouxvsAgAG9emg",
        price: "₹ 18,50,000",
        year: 2018,
        hours: "4200 h",
        condition: "Fair",
        location: "Karnal, Haryana",
        isFeatured: false,
        isVerified: false
    },
    {
        id: 5,
        name: "Swaraj 744 FE",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAopxn5Zb3qW4oFfQDyGrdfmw6GTuWdsp-ycKBkw68SnL_CZrUncAkJetQHMmpOzNvFjWfGhnJMxfDWM0HuSPB5xRdTd2EhRXBQkGhJ3VFSP8Nhx627PZe3SMmLtEM2f1_g1RGd4fZ7dZa35Cgr-_4Ek4U9y759CDUP9Dj5M9p1JS8rj7g4dhb8lrCrB_n4PF2OYyqYj32qGprjTyryHIu4AFU66rK20cdvqsC5JzZ9FS20S6ca195UTA",
        price: "₹ 5,20,000",
        year: 2020,
        hours: "1800 h",
        condition: "Good",
        location: "Amritsar, Punjab",
        isFeatured: true,
        isVerified: true
    },
    {
        id: 6,
        name: "Massey Ferguson 241 DI",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkCU4wzOwIgJGePnIVCE7oS1JVLfqBQZelpjmcr_qoWw2X9w9szKQIuekUTRm0mNAXMIyAEdCyaCRC7_4PVgdPkoKjsHI3ar9IfGmocaOKMPQq1PcbeeCm3KvMRyEBSeHqFXeiBJjGCGnq1gYzfk7CE33HBQz-m0nHCwObeXtIfcR7voCi0EVlqNqtyHE1Z-QuCea61TeqT5ZP-RV3cQazkR3Zzv5ZtB35EM6MbzF7CBye0RNA4jgbtQ",
        price: "₹ 4,80,000",
        year: 2017,
        hours: "3100 h",
        condition: "Good",
        location: "Nashik, Maharashtra",
        isFeatured: false,
        isVerified: true
    }
];

const Equipments = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEquipments = equipmentsData.filter(equipment =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="w-full pt-[72px] pb-20 min-h-screen bg-background">
            <div className="bg-surface border-b border-outline-variant/30 py-10 mb-10">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
                    <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-on-surface mb-4">All Equipment</h1>
                    <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
                        Browse our complete inventory of tractors, harvesters, and implements from verified sellers across India.
                    </p>
                    
                    <div className="max-w-3xl mx-auto flex gap-4">
                        <div className="flex-1 bg-surface-container rounded-lg flex items-center px-4 border border-outline-variant focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-outline">search</span>
                            <input 
                                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface ml-2 py-3 outline-none" 
                                placeholder="Search by name, brand or model..." 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-title-md text-xl font-bold text-on-surface">
                        {filteredEquipments.length} {filteredEquipments.length === 1 ? 'Result' : 'Results'} Found
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="font-body-sm text-on-surface-variant">Sort by:</span>
                        <select className="bg-surface border border-outline-variant rounded-md px-3 py-1.5 font-body-sm text-on-surface outline-none focus:border-primary">
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {filteredEquipments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEquipments.map(eq => (
                            <EquipmentCard key={eq.id} equipment={eq} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                        <span className="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
                        <h3 className="font-title-md text-2xl text-on-surface font-bold mb-2">No equipment found</h3>
                        <p className="text-on-surface-variant">Try adjusting your search term.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Equipments;
