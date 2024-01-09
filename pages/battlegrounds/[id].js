import Layout from '../../components/Layout';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NextImage from 'next/image';
import LinkPrevNextNavigation from '../../components/LinkPrevNextNavigation';
import currentData from '../../public/json/battlegrounds.json';

const BattleGroundDetail = ({ currentDataRow }) => {
  if (!currentDataRow) {
    return <div>Loading...</div>;
  }
    // Function to find the previous and next avatar names
    const findAdjacentData = (currentName) => {
      const sortedData = currentData.sort((a, b) => a.name.localeCompare(b.name));
      const currentIndex = sortedData.findIndex(avatar => avatar.name === currentName);
      const prevData = sortedData[currentIndex - 1] || sortedData[sortedData.length - 1];
      const nextData = sortedData[currentIndex + 1] || sortedData[0];


      const webUrlBase = '/battlegrounds/';
      prevData.url = webUrlBase+ prevData.id.toString();
      nextData.url = webUrlBase+ nextData.id.toString();
  
      return { prevData, nextData };
    };
  
    const { prevData, nextData } = findAdjacentData(currentDataRow.name);

  const { name, description, type,effects, id  } = currentDataRow;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* <div className="px-6 py-4">
          <NextImage  src={`/images/Data/${currentDataRow.id}.webp`} alt={name} width={750} height={1050} />
        </div> */}

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-900">Name: {name}</div>
          <p className="text-gray-800 text-base">Description: {description}</p>
        </div>

      {/* Type */}
      <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2">Type {type}</span>
      </div>

        {/* Effects */}
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2">Effects {effects}</span>
        </div>

    
        <div className="px-6 py-4">
          <LinkPrevNextNavigation prevEntry={prevData} nextEntry={nextData} />
        </div>
        
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const currentDataRow = currentData.find((avatar) => avatar.id === parseInt(id));

  if (!currentDataRow) {
    return { notFound: true };
  }

  return { props: { currentDataRow } };
}

export default BattleGroundDetail;
