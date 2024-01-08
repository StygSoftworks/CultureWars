import Layout from '../../components/Layout';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NextImage from 'next/image';
import avatarsData from '../../public/json/avatars.json';
import AvatarNavigation from '../../components/AvatarNavigation';

const minId = Math.min(...avatarsData.map((avatar) => avatar.id));
const maxId = Math.max(...avatarsData.map((avatar) => avatar.id));



const AvatarDetail = ({ avatarData }) => {
  if (!avatarData) {
    return <div>Loading...</div>;
  }

  const handleDownloadClick = async () => {
    try {
      const dataURL = await generateAvatarImage(avatarData);
      triggerImageDownload(`${avatarData.name.replace(/\s/g, '-')}.png`, dataURL);
    } catch (error) {
      console.error("Error generating avatar image:", error);
    }
  };


    // Function to find the previous and next avatar names
    const findAdjacentAvatars = (currentName) => {
      const sortedAvatars = avatarsData.sort((a, b) => a.name.localeCompare(b.name));
      const currentIndex = sortedAvatars.findIndex(avatar => avatar.name === currentName);
      const prevAvatar = sortedAvatars[currentIndex - 1] || sortedAvatars[sortedAvatars.length - 1];
      const nextAvatar = sortedAvatars[currentIndex + 1] || sortedAvatars[0];
  
      return { prevAvatar, nextAvatar };
    };
  
    const { prevAvatar, nextAvatar } = findAdjacentAvatars(avatarData.name);

  const { name, description, advantage, disadvantage, power, rant } = avatarData;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="px-6 py-4">
          <NextImage  src={`/images/avatars/${avatarData.id}.webp`} alt={name} width={750} height={1050} />
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

          <AvatarNavigation prevAvatar={prevAvatar} nextAvatar={nextAvatar} />
          
        </div>
        
      </div>
    </Layout>
  );
};


// Constants for canvas dimensions and styles
const CANVAS_WIDTH = 750;
const CANVAS_HEIGHT = 1050;
const TEXT_WIDTH = CANVAS_WIDTH - 100;
const PIC_HEIGHT = 300;
const PIC_OFFSET = 50;

// Function to generate avatar image
const generateAvatarImage = async (avatarData) => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');

  // Common styles
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 50px sans-serif';
  ctx.textAlign = 'center';

  // Load the image
  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = `/images/avatars/${avatarData.id}.webp`;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  // Draw the image and texts
  ctx.drawImage(image, PIC_OFFSET, PIC_OFFSET, CANVAS_WIDTH - (2 * PIC_OFFSET), PIC_HEIGHT);
  drawText(ctx, avatarData.name, 450);
  drawText(ctx, avatarData.description, 530);
  drawText(ctx, `Power: ${avatarData.power}`, 610);
  drawText(ctx, `Advantage: ${avatarData.advantage}`, 690);
  drawText(ctx, `Disadvantage: ${avatarData.disadvantage}`, 770);

  return canvas.toDataURL('image/png');
};

// Helper function to draw text
const drawText = (ctx, text, yOffset) => {
  ctx.fillText(text, CANVAS_WIDTH / 2, yOffset, TEXT_WIDTH);
};

// Function to trigger image download
const triggerImageDownload = (fileName, dataURL) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
