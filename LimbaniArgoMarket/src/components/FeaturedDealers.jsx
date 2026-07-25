import React from 'react';
import DealerCard from './DealerCard';

const FeaturedDealers = () => {
    const dealers = [
        {
            id: 1,
            name: "Kisan Agro Motors",
            rating: 4.8,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMz6a1af8ctKfb6MW5b8lwciGHdWHxSaumBrktSe8aw3vSzEQgc3F4ZALlUoe5yyMRD-0RODe2gDm4Uw3zBTabYO4uJLa-avnT0El_qmr3dZxdSCHIPKIxJXBLtFbfwmq8NaKE74CpUbQD09CHSeGhTDHrzWbvZ7Bf_M_9HV2ieZaeLg3apUasi_dCJcN7a_h5uKchYzJK2xNrdencJKbOV5DIMbLaz6CZjKn7DaLN35VTV0T6nICNGw",
            isPremium: true,
            isVerified: true,
            yearsInBusiness: 15,
            location: "Pune, Maharashtra",
            listingsCount: 245
        },
        {
            id: 2,
            name: "Shreeji Tractors",
            rating: 4.6,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmOqKD_oaecwxA4h5okVY0KCnTpZhTCf4QPE5K9MWWqcIEfmodtbjtsBs6VD3EE8O4J81j9qXjmEDiJFmtSXf4o13W4B2dtZcrdVaSHGJ7aT_I989BDw4aL-k2FhMA_NtR93UXR7ER9V49_lpikMuZsZn37-lGRaaCmnYpFstGeDhaFs-syNlQG-40ExvdyNsmRSk8QvnAl3zh2LaIwJbBGvIwwEzKzbLjsy2NVKvj5_E-xXVnyx_VYg",
            isPremium: true,
            isVerified: true,
            yearsInBusiness: 8,
            location: "Rajkot, Gujarat",
            listingsCount: 180
        },
        {
            id: 3,
            name: "Punjab Agri Equipments",
            rating: 4.9,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBapQawQ8-cPbOal3lRBjxxHIifaydF8-nz2CXY6SZX6intjSLwtW9ksHWWnLYmHytNLvT3VlomsLkUFubvOc3nrMBvHNcVCcIkv6qUoDxUOfszHjLtqbWbH10lf7udE3qFwkdXh4f_vrlpMgEvIMzcJjE5Rs3CjKdb9b1IGzHIiVeRz9mPRQsCotFcsrh51j5To1viEG30U_QRD5A_hgImzmIYLmB48uXND7AjdDQFAqNW-oQqnQ91SA",
            isPremium: false,
            isVerified: true,
            yearsInBusiness: 20,
            location: "Ludhiana, Punjab",
            listingsCount: 310
        }
    ];

    return (
        <section className="py-10 md:py-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="font-title-md text-3xl font-bold text-on-surface mb-2">Featured Premium Dealers</h2>
                    <p className="font-body-md text-on-surface-variant">Top-rated agricultural equipment sellers near you.</p>
                </div>
                <a className="hidden md:flex font-label-md text-primary hover:text-primary-container items-center gap-1 font-semibold" href="#">
                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {dealers.map(dealer => (
                    <DealerCard key={dealer.id} dealer={dealer} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedDealers;
