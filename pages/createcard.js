import React, { useState } from 'react';
import Layout from '../components/Layout';
import { v4 as uuidv4 } from 'uuid';

// Function to send new card data to the API
async function postNewCardData(newCardData) {
  try {
    const response = await fetch('/api/postCards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newCardData }), // Send the new card data as a JSON object
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Success message from the API
    } else {
      const errorData = await response.json();
      console.error(errorData.error); // Error message from the API
    }
  } catch (error) {
    console.error('Error sending new card data:', error);
  }
}


const CreateCard = () => {
  const [cardData, setCardData] = useState({
    name: '',
    type: '',
    subtype: '',
    cost: 0,
    attack: 0,
    defense: 0,
    description: '',
    abilities: '',
    image: '',
    guid: uuidv4(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postNewCardData(cardData);

    //if the card is created successfully, reset the form and make a success alert
    setCardData({
      name: '',
      type: '',
      subtype: '',
      cost: '',
      attack: '',
      defense: '',
      description: '',
      abilities: '',
      image: '',
      guid: uuidv4(),
    });
    //alert('Card created successfully!');

    //navigate back to the view cards page
    window.location.href = '/viewcards';
  
  };

  return (
    <Layout>
      <h1 className="text-1x2 font-bold mb-4">Create New Card</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={cardData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Type:</label>
          <input
            type="text"
            name="type"
            value={cardData.type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Subtype:</label>
          <input
            type="text"
            name="subtype"
            value={cardData.subtype}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Cost:</label>
          <input
            type="text"
            name="cost"
            value={cardData.cost}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Attack:</label>
          <input
            type="text"
            name="attack"
            value={cardData.attack}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Defense:</label>
          <input
            type="text"
            name="defense"
            value={cardData.defense}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <input
            type="text"
            name="description"
            value={cardData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Image URL:</label>
          <input
            type="text"
            name="image"
            value={cardData.image}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Abilities (One per line):</label>
          <textarea
            name="abilities"
            value={cardData.abilities}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Card
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateCard;
