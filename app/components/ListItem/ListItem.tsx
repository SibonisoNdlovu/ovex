import React from 'react';
import { Item } from '@/app/types/item';

const ListItem: React.FC<{ item: Item }> = React.memo(({ item }) => {
    console.log('item', item)
  return (
    <div className="bg-white rounded shadow-md p-4 mb-4">
      <div className="flex items-center">
        <img className="w-10 h-10" src={item.icon_url} alt={`${item.currency_id} icon`} />
        <div className="ml-4 flex-grow">
          <h1 className="text-xl font-bold text-black">{item.name} ({item.currency_id.toUpperCase()})</h1>
          <div className="flex justify-end">
            {[
              { url: item.whitepaper_url, text: 'Whitepaper' },
              { url: item.website_url, text: 'Website' },
              { url: item.cmc_url, text: 'CMC' },
              { url: item.coingecko_url, text: 'CoinGecko' },
            ].map((link, index) => (
              <a key={index} className="text-black ml-2 font-bold hover:underline" href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-black mt-2 font-bold">{item.description}</p>
    </div>
  );
});

export default ListItem;
