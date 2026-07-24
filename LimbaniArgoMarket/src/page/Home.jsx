import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeCategories from '../components/home/HomeCategories';
import HomeCTA from '../components/home/HomeCTA';
import HowItWorks from '../components/about/HowItWorks';
import LatestEquipment from '../components/LatestEquipment';
import FeaturedDealers from '../components/FeaturedDealers';

const Home = () => {
    return (
        <main className="w-full pt-[72px] bg-background overflow-hidden">
            {/* 1. Hero Section */}
            <HomeHero />

            {/* 2. Social Proof / Impact */}


            {/* 3. Browse by Category */}
            <HomeCategories />

            {/* 4. The Products */}
            <LatestEquipment />

            {/* 5. Educational / Trust */}
            <HowItWorks />

            {/* 6. Dealer Network */}
            <FeaturedDealers />

            {/* 7. Final Conversion */}
            <HomeCTA />
        </main>
    );
};

export default Home;