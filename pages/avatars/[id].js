import Layout from '../../components/Layout';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NextImage from 'next/image';

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
  
    // Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');

    // Pre-calculate values
    const centerX = WIDTH / 2;
    const textWidth = WIDTH - 100; // 100 is 2 * picWidthOffset
    const picHeight = 300;
    const picWidthOffset = 50;
    const picHeightOffset = 50;

    // Set common styles
    ctx.fillStyle = '#000';
    ctx.font = 'bold 50px sans-serif';
    ctx.textAlign = 'center';

    // Load the image
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = `/images/avatars/${avatarData.id}.webp`;

    try {
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });

        // Draw operations
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 20;
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);
        ctx.drawImage(image, picWidthOffset, picWidthOffset, WIDTH - (2 * picWidthOffset), picHeight);

        //round the corners
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(WIDTH - 20, 0);
        ctx.quadraticCurveTo(WIDTH, 0, WIDTH, 20);
        ctx.lineTo(WIDTH, HEIGHT - 20);
        ctx.quadraticCurveTo(WIDTH, HEIGHT, WIDTH - 20, HEIGHT);
        ctx.lineTo(20, HEIGHT);
        ctx.quadraticCurveTo(0, HEIGHT, 0, HEIGHT - 20);
        ctx.lineTo(0, 20);
        ctx.quadraticCurveTo(0, 0, 20, 0);
        ctx.closePath();
        ctx.clip();

        // Set common styles
        ctx.fillStyle = '#000';
        ctx.font = 'bold 50px sans-serif';
        ctx.textAlign = 'center';
        const drawText = (text, yOffset) => {
            ctx.fillText(text, centerX, picHeight + yOffset, textWidth);
        };


        const picStartY = 100 ;
        drawText(avatarData.name,picStartY+ picHeightOffset);
        drawText(avatarData.description, picStartY+ (2 * picHeightOffset));
        drawText(`Power: ${avatarData.power}`,picStartY+  (3 * picHeightOffset));
        drawText(`Advantage: ${avatarData.advantage}`, picStartY+ (4 * picHeightOffset));
        drawText(`Disadvantage: ${avatarData.disadvantage}`, picStartY+ (5 * picHeightOffset));

        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Creating a link to trigger download
        const link = document.createElement('a');
        link.download = `${avatarData.name.replace(/\s/g, '-')}.png`;
        link.href = dataURL;
        document.body.appendChild(link); // Append to body to ensure visibility in some browsers
        link.click();
        document.body.removeChild(link); // Remove the link after clicking

    } catch (error) {
        console.error("Error loading image:", error);
    }
};

  

  const { name, description, advantage, disadvantage, image, power, rant, id } = avatarData;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="px-6 py-4">
          <NextImage  src={`/images/avatars/${avatarData.id}.webp`} alt={name} width={750} height={1050} />

          {/* <button onClick={handleDownloadClick}>Download</button> */}
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
