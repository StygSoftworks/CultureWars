import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import bonuss from '../../public/json/bonus.json';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
const BonusIndex = () => {
  const [filteredbonuss, setFilteredbonuss] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name'); // Default sort by name

  useEffect(() => {
    // Sort the initial data by name in ascending order
    const sortedData = [...bonuss];
    sortedData.sort((a, b) => (a.name < b.name ? -1 : 1));
    setFilteredbonuss(sortedData);
  }, []);

  const handleFilter = (filterText) => {
    const filteredData = bonuss.filter((bonus) =>
      Object.values(bonus).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
    setFilteredbonuss(filteredData);
  };

  const handleSort = (property) => {
    const sortedData = [...filteredbonuss];
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
    });
    setFilteredbonuss(sortedData);
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
      <main className="p-8 roboto">
        <h1 className="text-2xl font-semibold mb-4">bonuss</h1>
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Filter for..."
            onChange={(e) => handleFilter(e.target.value)}
            className="px-2 py-1 border rounded-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                {/* <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID {renderSortIcon('id')}
                </th> */}
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name {renderSortIcon('name')}
                </th>

                {/* type */}
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Type {renderSortIcon('type')}
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
              {filteredbonuss.map((bonus) => (
                <tr key={bonus.id}>
                  {/* <td className="border px-4 py-2">{bonus.id}</td> */}

                  <td className="p-1">
                      {/* Use Link to navigate to the CardDetail page */}
                      <Link href={`/bonus/${bonus.id}`  }>
                        <span className='text-blue-500 hover:underline cursor-pointer'>{bonus.name} </span>
                      </Link>
                    </td>
                  {/* <td className="border px-4 py-2">{bonus.name}</td> */}
                  <td className="border px-4 py-2">{bonus.type}</td>
                  <td className="border px-4 py-2">{bonus.description}</td>
                  <td className="border px-4 py-2">{bonus.effects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default BonusIndex;
