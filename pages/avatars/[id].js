import Layout from '../../components/Layout';
import React from 'react';
import Image from 'next/image';

// Load avatars.json and cache it
const avatarsData = require('../../public/json/avatars.json');

const minId = Math.min(...avatarsData.map((avatar) => avatar.id));
const maxId = Math.max(...avatarsData.map((avatar) => avatar.id));

const AvatarDetail = ({ avatarData }) => {
  if (!avatarData) {
    return <div>Loading...</div>;
  }

  const { name, description, advantage, disadvantage, image, power } = avatarData;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Changed background color */}

        { <center>
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          sizes='(max-width: 500px) 100vw, 500px'
          className='rounded-lg shadow-lg'
          priority // Mark image as high priority
        />
        </center> }
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-900">{name}</div> {/* Changed text color */}
          <p className="text-gray-800 text-base">{description}</p> {/* Changed text color */}
        </div>
        <div className="px-6 py-4">
        <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2">Power:{power}</span> {/* Changed badge colors */}
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2">Advantage:{advantage}</span> {/* Changed badge colors */}
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2">Disadvantage:{disadvantage}</span> {/* Changed badge colors */}
        </div>

        {/* Add a Next link to the previous avatar and the next avatar */}
        <div className="flex justify-between px-6 py-4">
          <a
            href={`/avatars/${avatarData.id === minId ? maxId : avatarData.id - 1}`}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            Previous Avatar
          </a>
          <a
            href={`/avatars/${avatarData.id === maxId ? minId : avatarData.id + 1}`}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            Next Avatar
          </a>
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
