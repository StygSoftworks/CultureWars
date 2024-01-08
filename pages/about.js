// pages/about.js

import React from 'react';
import Layout from '@/components/Layout';
import { Inter } from 'next/font/google'

const About = () => {
  return (
    <Layout>

      <main className='jolly-lodger'>
        <h1>Welcome to Culture Wars!</h1>
        <p>
          At Culture Clash Games, we believe in gaming that's as witty as it is engaging. 'Culture Wars' is our latest venture—a card game that dives headfirst into the cesspool of American subcultures.
        </p>
        <p>
          We are committed to creating a game that is inclusively insulting and fun.
        </p>
        <p>
        We invite you to be a part of our journey. Whether you're a hardcore gamer or just looking for a fun night with friends, 'Culture Wars' is sure to delight. Stay tuned for updates, expansions, and new game releases from Culture Clash Games.
        </p>
      
      </main>
    </Layout>
  );
};

export default About;
