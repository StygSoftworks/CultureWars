import Layout from '../../components/Layout';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NextImage from 'next/image';
import avatarsData from '../../public/json/avatars.json';
import AvatarNavigation from '../../components/AvatarNavigation';

const AvatarDetail = ({ avatarData }) => {
  if (!avatarData) {
    return <div>Loading...</div>;
  }
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
    
        <div className="px-6 py-4">
          <AvatarNavigation prevAvatar={prevAvatar} nextAvatar={nextAvatar} />
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
