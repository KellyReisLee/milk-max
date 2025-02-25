import React from 'react';
import HeroSection from '../components/HeroSection';
import Sponsors from '../components/Sponsors';
import Features from '../components/Features';
import AboutSoftware from '../components/AboutSoftware';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';

function Home() {
  return (
    <>
      <HeroSection />
      <Sponsors />
      <Features />
      <AboutSoftware />
      <Testimonials />
      <Pricing />
    </>
  );
}

export default Home;