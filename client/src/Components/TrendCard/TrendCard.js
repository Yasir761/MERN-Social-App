import React from 'react';
import { TrendData } from '../Data/TrendData';

const TrendCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6  space-x-6 m-10">
      <h3 className="text-xl font-semibold text-gray-800">Trending for you</h3>

      {TrendData.map((trend) => (
        <div key={trend.name} className="flex justify-between items-center space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-gray-900">#{trend.name}</span>
            <span className="text-sm text-gray-500">{trend.shares}k Shares</span>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
