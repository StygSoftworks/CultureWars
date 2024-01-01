const urlDataJson = process.env.GITHUB_RAW_URL;

export default async (req, res) => {
  try {
    const response = await fetch(urlDataJson,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Check if a GUID query parameter is provided
    const { guid } = req.query;

    if (guid) {
    
      //console.log('guid', guid);
    
      // Filter the data based on the provided GUID
      const filteredData = data.filter((card) => card.guid === guid);

      //console.log('filteredData', filteredData);

      if (filteredData.length === 0) {
        return res.status(404).json({ message: 'Card not found' });
      }

      res.status(200).json(filteredData[0]);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching card data:', error);
    res.status(500).json({ message: 'Error fetching card data' });
  }
};
