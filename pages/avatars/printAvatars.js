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
                // Set the text size to 10
                doc.setFontSize(10);

                // Add the avatar name to the document
                doc.text(avatar.name, x + 10, y + 10);

                // Add the avatar image to the document
                doc.addImage(image, "JPEG", x + 15, y + 15, 50, 50);

                // Wrap a border around the avatar
                doc.rect(x + 10, y + 5, 60, 75);

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
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                    onClick={createPdf}
                >
                    Create PDF
                </button>
            </main>
        </Layout>
    );
}


export default AvatarPdfMaker;