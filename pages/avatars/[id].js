import Layout from '../../components/Layout';
import React from 'react';
import Image from 'next/image';

// Load avatars.json and cache it
const avatarsData = require('../../public/json/avatars.json');

const AvatarDetail = ({ avatarData }) => {
  if (!avatarData) {
    return <div>Loading...</div>;
  }

  const { name, description, advantage, disadvantage, image } = avatarData;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <center>
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          sizes='(max-width: 500px) 100vw, 500px'
          className='rounded-lg shadow-lg'
          priority // Mark image as high priority
        />
        </center>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{advantage}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{disadvantage}</span>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  // Find the avatar data by id
  const avatarData = avatarsData.find((avatar) => avatar.id === parseInt(id));

  if (!avatarData) {
    return {
      notFound: true, // Return a 404 page if the avatar is not found
    };
  }

  return {
    props: {
      avatarData,
    },
  };
}

export default AvatarDetail;
