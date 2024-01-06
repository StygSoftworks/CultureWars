import Layout from '../../components/Layout';
import React from "react";
import { jsPDF } from "jspdf";

const avatarsData = require('../../public/json/avatars.json');

const AvatarPdfMaker = () => {
    
    
    const createPdf = async () => {
        // Create a new PDF document
        const doc = new jsPDF();
        const MAXROWS = 3;
        const MAXCOLS = 3;
        const imgPromises = [];

        avatarsData.forEach(avatar => {
            const imgPromise = new Promise((resolve, reject) => {
                const image = new Image();
                image.crossOrigin = 'Anonymous';
                image.src = `/images/avatars/${avatar.id}.webp`;
                image.onload = () => resolve({ image, avatar });
                image.onerror = reject;
            });
            imgPromises.push(imgPromise);
        });

        Promise.all(imgPromises).then(results => {
            let x = 0;
            let y = 0;
            let counter = 0;

            results.forEach(({ image, avatar }) => {


                //wrap a rounded border around the avatar
                doc.setLineWidth(0.5);
                doc.setDrawColor(0, 0, 0);
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(x + 10, y + 5, 60, 75, 5, 5, 'FD');

                // Set the text size to 10
                doc.setFontSize(10);

                // Add the avatar name to the document
                doc.text(avatar.name, x + 12, y + 10);

                // Add the avatar image to the document
                doc.addImage(image, "JPEG", x + 15, y + 15, 50, 50);

                //put the power to the bottom right corner which is a number
                

                doc.setFontSize(20);
                //set the color to orange
                doc.setTextColor(255, 165, 0);
                doc.text(avatar.power.toString(), x + 60, y + 75);

                //draw a diamond around the power

                //set the color to dark orange
                doc.setDrawColor(255, 140, 0);
                doc.setLineWidth(0.5);
                doc.line(x + 60+2., y + 75-7.5, x + 65+2., y + 80-7.5);
                doc.line(x + 65+2., y + 80-7.5, x + 60+2., y + 85-7.5);
                doc.line(x + 60+2., y + 85-7.5, x + 55+2., y + 80-7.5);
                doc.line(x + 55+2., y + 80-7.5, x + 60+2., y + 75-7.5);



                //write the advantage and disadvantage
                doc.setFontSize(8);
                //set the color to green
                doc.setTextColor(0, 128, 0);
                //doc.text(avatar.advantage, x + 12, y + 71);
                //set the color to red
                doc.setTextColor(255, 0, 0);
                //doc.text(avatar.disadvantage, x + 12, y + 76);


                //set the color to black
                doc.setTextColor(0, 0, 0);
                doc.setDrawColor(0, 0, 0);




                

                // Wrap a border around the avatar
                //doc.rect(x + 10, y + 5, 60, 75);

                


                // Increment the x position
                x += 65;
                counter++;

                // If we have reached the end of the row, reset the x position and increment the y position
                if (counter === MAXCOLS) {
                    x = 0;
                    y += 100;
                    counter = 0;
                }

                // If we have reached the end of the page, start a new page
                if (y >= 300) {
                    doc.addPage();
                    x = 0;
                    y = 0;
                }

                //set the color to black
                doc.setTextColor(0, 0, 0);
                //set line color to black
                doc.setDrawColor(0, 0, 0);
            });

            // Save the PDF
            doc.save("avatars.pdf");
        }).catch(error => {
            console.error("Error loading image:", error);
        });
    };


    return (
        <Layout>
            <main className="flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Print Avatars
                </h1>
                <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded inline-flex items-center"
                    onClick={createPdf}
                >
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                    <span>Create PDF</span>
                </button>
            </main>
        </Layout>
    );
}


export default AvatarPdfMaker;