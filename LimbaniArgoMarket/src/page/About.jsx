import React from 'react';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import MissionVision from '../components/about/MissionVision';
import HowItWorks from '../components/about/HowItWorks';
import OurServices from '../components/about/OurServices';
import EquipmentCategories from '../components/about/EquipmentCategories';
import WhyChooseUs from '../components/about/WhyChooseUs';
import CoreValues from '../components/CoreValues';
import MeetOurTeam from '../components/about/MeetOurTeam';
import Advertisement from '../components/about/Advertisement';
import Testimonials from '../components/about/Testimonials';
import FAQ from '../components/about/FAQ';
import ContactInfo from '../components/about/ContactInfo';

const About = () => {
    return (
        <main className="w-full pt-[72px] bg-background overflow-hidden">
            <AboutHero />
            <OurStory />
            <MissionVision />
            <HowItWorks />
            <OurServices />
            <EquipmentCategories />
            <WhyChooseUs />
            <CoreValues />
            <MeetOurTeam />
            <Advertisement />
            <Testimonials />
            <FAQ />
            <ContactInfo />
        </main>
    );
};

export default About;
