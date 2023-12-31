// pages/viewcards.js

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

const ViewCards = () => {
  const [cardData, setCardData] = useState([]);
  
  useEffect(() => {
    //get the card data from the public/cards.json file
    fetch('/cards.json')
        .then((response) => response.json())
        .then((data) => {
            setCardData(data);
        })
        .catch((error) => {
            console.error('Error fetching card data:', error);
        });

  }, []);

  return (
    <Layout>
      <main>
        <h1 className="text-2xl font-bold">View Cards</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-1">Name</th>
                <th className="p-1">Type</th>
                <th className="p-1 hidden md:table-cell">Subtype</th>
                <th className="p-1">Cost</th>
                <th className="p-1">Attack</th>
                <th className="p-1">Defense</th>
                <th className="p-1 hidden md:table-cell">Description</th>
                <th className="p-1 hidden md:table-cell">Image</th> {/* Hide on small screens */}
              </tr>
            </thead>
            <tbody>
              {cardData.map((card, index) => (
                <tr key={index}>
                  <td className="p-1">{card.name}</td>
                  <td className="p-1">{card.type}</td>
                  <td className="p-1 hidden md:table-cell">{card.subtype}</td>
                  <td className="p-1">{card.cost}</td>
                  <td className="p-1">{card.attack}</td>
                  <td className="p-1">{card.defense}</td>
                  <td className="p-1 hidden md:table-cell">{card.description}</td>
                  <td className="p-2 hidden md:table-cell"> {/* Hide on small screens */}
                    <div className="hover:transform hover:scale-125 transition-transform">
                      <Image src={card.image} width={100} height={100} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default ViewCards;
