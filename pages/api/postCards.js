// pages/api/postCards.js
import fetch from 'node-fetch'; // Import the 'node-fetch' library for server-side fetch

const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const githubApiKey = process.env.GITHUB_API_token;
    const oldCards =  await fetch(process.env.GITHUB_RAW_URL);
    const dataOldCards = await oldCards.json();
    const { newCardData } = req.body; // Expecting a JSON object with new card data

    dataOldCards.push(newCardData);

    // Get the SHA of the existing file
    const fileResponse = await fetch(process.env.GITHUB_CARD_API_REPO, {
      headers: {
        'Authorization': `Bearer ${githubApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const fileData = await fileResponse.json();

    const sha = fileData.sha;

    // Update the file in the repository
    const updateResponse = await fetch(process.env.GITHUB_CARD_API_REPO, {
      method: 'PUT',
      body: JSON.stringify({
        message: "Update cards.json",
        content: btoa(JSON.stringify(dataOldCards)), // Base64 encode the JSON data
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
