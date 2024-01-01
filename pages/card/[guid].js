import Layout from '../../components/Layout';
import React from 'react';
import { toPng } from 'html-to-image';
// Function to fetch data. This can be outside the component.
const fetchCardData = async (guid) => {
  const urlDataJson = `${process.env.BASE_URL}/api/getCardByGuid?guid=${guid}`;
  console.log(urlDataJson);

  const response = await fetch(`${process.env.BASE_URL}/api/getCardByGuid?guid=${guid}`);
  if (!response.ok) {
    //console.log(response);
    throw new Error('Failed to fetch data');
  }
  return response.json();
};



const CardDetail = ({ cardData, error }) => {


    // Function to handle the export
    const exportToPng = async () => {
      try {
        const cardElement = document.getElementById('card-element');

        //set the background color to white (default is transparent)
        cardElement.style.backgroundColor = 'white';

        const dataUrl = await toPng(cardElement);
  
        // Creating a link to trigger download
        const link = document.createElement('a');
        link.download = `${cardData.name.replace(/\s/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('oops, something went wrong!', err);
      }
    };


  if (error) {
    console.error(error);
    return <div>{error}</div>;
  }

  if (!cardData) {
    return <div>Loading...</div>;
  }

  // Render your card details here
  return (
    <Layout>
<div id="card-element" className="max-w-lg  card-element ">
  <img src={cardData.image} alt={cardData.name} className="w-full h-64 object-cover" />

  <div className="p-6">
    <h2 className="font-bold text-2xl mb-2 text-gray-800">{cardData.name}</h2>
    <p className="text-gray-700 text-base mb-4">{cardData.description}</p>

    <div className="flex flex-wrap justify-start mb-4">
      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
        Type: {cardData.type}
      </span>
      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
        Subtype: {cardData.subtype}
      </span>
    </div>

    <div className="flex flex-wrap justify-start mb-4">
      <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-800 m-1">
        Attack: {cardData.attack}
      </span>
      <span className="bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-800 m-1">
        Defense: {cardData.defense}
      </span>
      <span className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 m-1">
        Cost: {cardData.cost}
      </span>
    </div>

    <div>
      <p className="text-gray-700 text-base mb-2">
        Abilities:
      </p>
      <ul className="list-disc ml-6 text-gray-600">
        {cardData.abilities.map((ability, index) => (
          <li key={index}>{ability}</li>
        ))}
      </ul>
    </div>
  </div>
</div>
{/* Export Button */}
<div className="text-center mt-4">
        <button onClick={exportToPng} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Export as PNG
        </button>
      </div>



      <style jsx>{`
/* Adjusted CSS class for PNG export */
.card-element {
  max-width: m; /* Adjust the width as needed */
  background-color: white;
  border-radius: 0.5rem; /* rounded-lg equivalent */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg equivalent */
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem; /* mt-10 equivalent */
  transition: none; /* Disabling transitions for export */
  transform: none; /* Disabling transform on hover */
}


`}</style>


    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { guid } = context.params; // Extract the 'guid' parameter
    const data = await fetchCardData(guid);
    return { props: { cardData: data } };
  } catch (error) {
    return { props: { error: error.message } };
  }
};




export default CardDetail;
