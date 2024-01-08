import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import battlegrounds from '../../public/json/battlegrounds.json';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const BattlegroundIndex = () => {
  const [filteredBattlegrounds, setFilteredBattlegrounds] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name'); // Default sort by name

  useEffect(() => {
    // Sort the initial data by name in ascending order
    const sortedData = [...battlegrounds];
    sortedData.sort((a, b) => (a.name < b.name ? -1 : 1));
    setFilteredBattlegrounds(sortedData);
  }, []);

  const handleFilter = (filterText) => {
    const filteredData = battlegrounds.filter((battleground) =>
      battleground.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredBattlegrounds(filteredData);
  };

  const handleSort = (property) => {
    const sortedData = [...filteredBattlegrounds];
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
    });
    setFilteredBattlegrounds(sortedData);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setSortColumn(property);
  };

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ChevronUpIcon className="w-4 h-4 inline-block -ml-1" />
      ) : (
        <ChevronDownIcon className="w-4 h-4 inline-block -ml-1" />
      );
    }
    return null;
  };

  return (
    <Layout>
      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Battlegrounds</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by name..."
            onChange={(e) => handleFilter(e.target.value)}
            className="px-2 py-1 border rounded-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID {renderSortIcon('id')}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name {renderSortIcon('name')}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('description')}
                >
                  Description {renderSortIcon('description')}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('effects')}
                >
                  Effects {renderSortIcon('effects')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBattlegrounds.map((battleground) => (
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
