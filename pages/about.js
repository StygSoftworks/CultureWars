// pages/about.js

import React from 'react';
import Layout from '@/components/Layout';
import { Inter } from 'next/font/google'

const About = () => {
  return (
    <Layout>

      <main>
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
          magna nec quam luctus fermentum. Vivamus eget nisi ut lectus bibendum
          placerat. Sed vitae vestibulum risus, a suscipit justo.
        </p>
        <p>
          Integer vel libero at ipsum fermentum euismod ac in arcu. Sed nec
          egestas leo. Praesent malesuada diam non erat tristique, non venenatis
          justo tincidunt.
        </p>
        <p>
          Fusce auctor, ex at vehicula tincidunt, justo tellus tincidunt dui, ut
          pharetra neque justo vel ligula.
        </p>
      
      </main>
    </Layout>
  );
};

export default About;
