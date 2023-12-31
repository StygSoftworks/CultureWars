import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newData = req.body;

    try {
      // Read existing data from the file, if any
      let existingData = [];
      try {
        existingData = JSON.parse(fs.readFileSync('./public/cards.json', 'utf-8'));
      } catch (error) {
        // Handle file not found or empty file by creating an empty array
        if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
          existingData = [];
        } else {
          throw error;
        }
      }

      // Append the new data to the existing data array
      existingData.push(newData);

      // Write the updated data back to the file
      fs.writeFileSync('./public/cards.json', JSON.stringify(existingData, null, 2));

      console.log('New card data has been appended!');
      res.status(200).json({ message: 'Card data saved successfully.' });
    } catch (error) {
      console.error('Error writing to file:', error);
      res.status(500).json({ message: 'Error saving card data.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
