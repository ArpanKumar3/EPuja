import React from 'react';
import Hero from '../components/Hero';
import UpcomingPujas from '../components/UpcomingPujas';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import MeetPandits from '../components/MeetPandits';

const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingPujas />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <MeetPandits />
    </>
  );
};

export default Home;
