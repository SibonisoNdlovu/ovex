"use client" // This means that by defining a "use client" in a file, all other modules imported into it, including child components, are considered part of the client bundle.

import React, { useState, useEffect } from 'react';
import { Item } from '@/app/types/item'; 
import ListItem from '../ListItem/ListItem'; 

const ListContainer: React.FC = () => {
  // State variables for currencies, search text, and loading state
  const [currencies, setCurrencies] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetching currency data from an API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currencyResponse, nameResponse] = await Promise.all([
          fetch('https://api.review.ovex.io/mobile_api/v1/currency/utility').then(response => response.json()),
          fetch('https://api.review.ovex.io/mobile_api/v1/currency').then(response => response.json())
        ]);

        const mergedCurrencies = currencyResponse.map((currency: Item) => {
          const nameData = nameResponse.find((name: any) => name.id === currency.currency_id);
          return { ...currency, name: nameData?.name };
        });

        setCurrencies(mergedCurrencies);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering currencies based on search text
  const filteredCurrencies = currencies.filter(currency =>
    currency.currency_id.toLowerCase().includes(searchText.toLowerCase()) ||
    currency.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search currencies..."
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {/* Showing loading spinner if data is loading */}
      {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-black h-6 w-6 animate-spin font-bold"></div>
          </div>
        )}
      {/* Rendering each filtered currency as a ListItem */}
      <div className="text-left">
        {filteredCurrencies.map(currency => (
          <ListItem key={currency.currency_id} item={currency} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
