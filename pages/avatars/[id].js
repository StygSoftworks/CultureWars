import Layout from '../../components/Layout';
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NextImage from 'next/image';

// Dynamic import for Fabric.js to ensure it loads on client-side
const FabricCanvas = dynamic(
  () => import('../../components/FabricCanvas'), // Adjust the path as per your directory structure
  { ssr: false }
);

// Load avatars.json
const avatarsData = require('../../public/json/avatars.json');

const minId = Math.min(...avatarsData.map((avatar) => avatar.id));
const maxId = Math.max(...avatarsData.map((avatar) => avatar.id));

const AvatarDetail = ({ avatarData }) => {
  if (!avatarData) {
    return <div>Loading...</div>;
  }

  const handleDownloadClick = async () => {
    const WIDTH = 750;
    const HEIGHT = 1050;


  
    console.log('avatarData.image', avatarData.image);
  
    // Load the image
    const image = new Image();
    image.crossOrigin = 'Anonymous'; // Use this if the image is served from a different domain
    image.src = avatarData.image;
  
    // Wait for the image to load
    image.onload = () => {
      // Create a canvas
      const canvas = document.createElement('canvas');
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const ctx = canvas.getContext('2d');
  
      // Make the image all white
      ctx.fillStyle = '#fff';
      ctx.fillRect(0,0,WIDTH,HEIGHT);

      //draw a rounded black rectangle border around the canvas
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, WIDTH, HEIGHT);

      // Draw the image on the canvas
      const picWidthX = 10;
      const picWidthOffset = 50;
      const picHeight = 300
      const picHeightOffset = 50;
      ctx.drawImage(image, picWidthOffset, picWidthX, canvas.width - (2*picWidthOffset), picHeight);

      // Draw the name
      ctx.fillStyle = '#000';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(avatarData.name, canvas.width / 2, picHeight + picHeightOffset, canvas.width - (2*picWidthOffset), 50);

      // Draw the description
      ctx.fillStyle = '#000';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(avatarData.description, canvas.width / 2, picHeight + (2*picHeightOffset), canvas.width - (2*picWidthOffset), 50);
  
      // Draw the power
      ctx.fillStyle = '#000';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Power: ${avatarData.power}`, canvas.width / 2, picHeight + (3*picHeightOffset), canvas.width - (2*picWidthOffset), 50);

      // Draw the advantage
      ctx.fillStyle = '#000';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Advantage: ${avatarData.advantage}`, canvas.width / 2, picHeight + (4*picHeightOffset), canvas.width - (2*picWidthOffset), 50);

      // Draw the disadvantage
      ctx.fillStyle = '#000';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Disadvantage: ${avatarData.disadvantage}`, canvas.width / 2, picHeight + (5*picHeightOffset), canvas.width - (2*picWidthOffset), 50);
      
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');
  
      // Creating a link to trigger download
      const link = document.createElement('a');
      link.download = `${avatarData.name.replace(/\s/g, '-')}.png`;
      link.href = dataURL;
      link.click();
    };
  };
  

  const { name, description, advantage, disadvantage, image, power, rant } = avatarData;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* <div className="flex justify-between px-6 py-4">
        <FabricCanvas avatarImage={image} />
        </div> */}

        <div className="px-6 py-4">
          <NextImage  src={image} alt={name} width={750} height={1050} />

          <button onClick={handleDownloadClick}>Download</button>
        </div>


        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
          <p className="text-gray-800 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2">Power: {power}</span>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2">Advantage: {advantage}</span>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2">Disadvantage: {disadvantage}</span>
        </div>
        <div className="px-6 pt-4 pb-2">
          {rant.map((rant, index) => (
            <p key={index} className="text-gray-700 text-base">{rant}</p>
          ))}
        </div>
        <div className="flex justify-between px-6 py-4">
          <Link href={`/avatars/${avatarData.id === minId ? maxId : avatarData.id - 1}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Previous Avatar
          </Link>
          <Link href={`/avatars/${avatarData.id === maxId ? minId : avatarData.id + 1}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Next Avatar
          </Link>
        </div>
        
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const avatarData = avatarsData.find((avatar) => avatar.id === parseInt(id));

  if (!avatarData) {
    return { notFound: true };
  }

  return { props: { avatarData } };
}

export default AvatarDetail;
