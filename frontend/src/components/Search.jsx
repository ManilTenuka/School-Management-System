import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef();

  return (
   
    <div className="relative flex items-center mt-2">
    <input
      type="text"
      placeholder="Search"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setShowDropdown(true); // Show dropdown when typing
      }}
      className="w-60 max-w-sm py-2 px-4 pr-10 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="absolute right-4 text-gray-500 hover:text-gray-700">
      <FiSearch size={20} />
    </button>
  </div>
  
  );
};

export default Search;
