// pages/api/postCards.js

import { Console } from 'console';
import fetch from 'node-fetch'; // Import the 'node-fetch' library for server-side fetch

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const githubApiKey = process.env.GITHUB_API_token;
    
    //console.log(githubApiKey);

    const { newCardData } = req.body; // Expecting a JSON object with new card data

    //console.log(newCardData);
    // Perform your data processing here using newCardData

    // Example: Add the new card data to an array
    const jsonData = []; // You should replace this with your actual data source
    jsonData.push(newCardData);

    //console.log(process.env.GITHUB_CARD_API_REPO);

    // Get the SHA of the existing file
    const fileResponse = await fetch(process.env.GITHUB_CARD_API_REPO, {
      headers: {
        'Authorization': `Bearer ${githubApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const fileData = await fileResponse.json();

    //console.log(fileData);

    const sha = fileData.sha;

    // Update the file in the repository
    const updateResponse = await fetch(process.env.GITHUB_CARD_API_REPO, {
      method: 'PUT',
      body: JSON.stringify({
        message: "Update cards.json",
        content: btoa(JSON.stringify(jsonData)), // Base64 encode the JSON data
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
      res.status(200).json({ message: 'Card data saved successfully.' });
    } else {
      console.error('Error saving card data.', updateData);
      res.status(500).json({ error: 'Error saving card data.' });
    }
  } catch (error) {
    console.error('Error in updating the file:', error);
    res.status(500).json({ error: 'Error in updating the file.' });
  }
}
