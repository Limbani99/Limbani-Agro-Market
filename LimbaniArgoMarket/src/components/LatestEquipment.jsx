import React from 'react';
import EquipmentCard from './EquipmentCard';

const LatestEquipment = () => {
    const latestEquipments = [
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
        }
    ];

    return (
        <section className="py-stack-lg bg-surface-bright border-y border-outline-variant/20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">Latest Equipment</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2">Recently added machinery from verified sellers.</p>
                    </div>
                    <a href="/equipments" className="font-label-md text-label-md bg-surface border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-container transition-colors hidden md:block text-on-surface">
                        View All
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                    {latestEquipments.map(eq => (
                        <EquipmentCard key={eq.id} equipment={eq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestEquipment;
