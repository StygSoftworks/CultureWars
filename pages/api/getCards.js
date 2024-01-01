const urlDataJson = process.env.GITHUB_RAW_URL;

export default async (req, res) => {
  try {
    const response = await fetch(urlDataJson);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching card data:', error);
    res.status(500).json({ message: 'Error fetching card data' });
  }
};
