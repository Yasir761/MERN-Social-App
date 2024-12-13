import React, { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

const LogoSearch = ({ logo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex items-center space-x-4 w-full max-w-md">
      {/* Logo with hover effect */}
      <div className="flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
        {/* <img 
          src={logo} 
          alt="Logo" 
          className="w-14 h-14 object-contain rounded-full shadow-md" 
        /> */}
      </div>

      {/* Search Container */}
      <div className="flex-grow relative">
        <div className="flex items-center bg-gray-100 rounded-xl shadow-inner overflow-hidden">
          <div className="pl-4 text-gray-500">
            <SearchIcon className="w-5 h-5" />
          </div>
          
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search #hashtags, topics, or people" 
            className="
              w-full 
              py-3 
              px-3 
              text-sm 
              text-gray-800 
              bg-transparent 
              outline-none 
              placeholder-gray-500 
              focus:ring-2 
              focus:ring-purple-200 
              transition-all 
              duration-300
            " 
          />

          {/* Clear Search Button */}
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="
                mr-2 
                text-gray-400 
                hover:text-gray-600 
                transition-colors 
                duration-200
              "
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Optional: Quick search suggestions or recent searches could go here */}
        {searchTerm && (
          <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-xl z-10">
            {/* Placeholder for search suggestions */}
            <div className="p-4 text-sm text-gray-500">
              Search suggestions would appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoSearch;