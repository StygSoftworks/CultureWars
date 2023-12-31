import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { typescript } from '@/next.config';

const CreateCard = () => {
  const [cardData, setCardData] = useState({
    name: '',
    type: '',
    subtype: '',
    cost: '',
    attack: '',
    defense: '',
    description: '',
    abilities: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split abilities input into an array by new lines
    const abilitiesArray = cardData.abilities.split('\n').map((ability) => ability.trim());

    // Updated card data with abilities as an array
    const updatedCardData = {
      ...cardData,
      abilities: abilitiesArray,
    };

    // Handle card creation here with updatedCardData
    console.log('Card data:', updatedCardData);

    try {
        const response = await fetch('/api/createCard', {
            method: 'POST',
            body: JSON.stringify(updatedCardData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            console.log('Card data saved successfully.');
        } else {
            console.error('Error saving card data.');
        }

    } catch (error) {
        console.error('Error saving card data:', error);
    }





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
