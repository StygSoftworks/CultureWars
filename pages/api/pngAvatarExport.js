import { createCanvas, loadImage } from 'canvas';

export default async (req, res) => {
  const { query: { avatarId } } = req;

  //get the data based on the avatarId

  //get the avatar data from the json file
  const avatarsData = require('../../public/json/avatars.json');


  const avatarData = avatarsData.find((avatar) => avatar.id === parseInt(avatarId));

  if (!avatarData) {
    return {
      notFound: true, // Return a 404 page if the avatar is not found
    };
  }



  // Validate avatarId or perform any necessary data retrieval here

  const canvas = createCanvas(750, 1050); // 750x1050
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw a rounded black rectangle around the border
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(750, 0);
  ctx.lineTo(750, 1050);
  ctx.lineTo(0, 1050);
  ctx.closePath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // Customize and draw your content here using canvas API
  ctx.font = '40px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Avatar ID: ${avatarId}`, 50, 100);

  ctx.font = '12px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Name: ${avatarData.name}`, 50, 150);

  //Power
  ctx.fillText(`Power: ${avatarData.power}`, 50, 200);

  //Advantage
  ctx.fillText(`Advantage: ${avatarData.advantage}`, 50, 250);

  //Disadvantage
  ctx.fillText(`Disadvantage: ${avatarData.disadvantage}`, 50, 300);

  //description
  ctx.fillText(`Description: ${avatarData.description}`, 50, 350);

  // Save the canvas as a PNG image
  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
};
