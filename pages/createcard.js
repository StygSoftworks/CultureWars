import React, { useState } from 'react';
import Layout from '../components/Layout';
import GetCards from '../components/GetCards';

const CreateCard = () => {

  
  const { jsonData, isLoading, error } = GetCards();

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
    const githubApiKey = process.env.github_API_token;
    const abilitiesArray = cardData.abilities.split('\n').map(ability => ability.trim());
    const updatedCardData = { ...cardData, abilities: abilitiesArray };
  
    // Check for loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    // Add the new card data to jsonData
    const newJsonData = [...jsonData, updatedCardData];
  
    try {
      // Get the SHA of the existing file
      const fileResponse = await fetch(process.env.github_card_api_repo, {
        headers: {
          'Authorization': `Bearer ${githubApiKey}`,
          'Content-Type': 'application/json',
        },
      });
      const fileData = await fileResponse.json();
      const sha = fileData.sha;

      // Update the file in the repository
      const updateResponse = await fetch(process.env.github_card_api_repo, {
        method: 'PUT',
        body: JSON.stringify({
          message: "Update cards.json",
          content: btoa(JSON.stringify(newJsonData)), // Base64 encode the JSON data
          sha: sha,
        }),
        headers: {
          'Authorization': `Bearer ${githubApiKey}`,
          'Content-Type': 'application/json',
        },
      });
  
      const updateData = await updateResponse.json();
  
      if (updateResponse.ok) {
        console.log('Card data saved successfully.', updateData);
      } else {
        console.error('Error saving card data.', updateData);
      }
    } catch (error) {
      console.error('Error in updating the file:', error);
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
