import React from 'react';
import Layout from '../../components/Layout';
import battlegrounds from '../../public/json/battlegrounds.json';

const BattlegroundIndex = () => {
  return (
    <Layout>
      <main className="p-1 text-top">
        <h1 className="text-2xl font-semibold mb-4">Battlegrounds</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Effects</th>
              </tr>
            </thead>
            <tbody>
              {battlegrounds.map((battleground) => (
                <tr key={battleground.id}>
                  <td className="border px-4 py-2">{battleground.id}</td>
                  <td className="border px-4 py-2">{battleground.name}</td>
                  <td className="border px-4 py-2">{battleground.description}</td>
                  <td className="border px-4 py-2">{battleground.effects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default BattlegroundIndex;
