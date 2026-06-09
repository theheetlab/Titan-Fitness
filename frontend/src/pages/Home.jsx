import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import MembershipPlans from '../components/MembershipPlans';
import Trainers from '../components/Trainers';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import ContactCTA from '../components/ContactCTA';

function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <MembershipPlans />
      <Trainers />
      <Testimonials />
      <Gallery />
      <ContactCTA />
    </>
  );
}

export default Home;
