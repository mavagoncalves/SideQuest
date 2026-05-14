import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-xl mx-auto mb-10 px-4">
      <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Try something like 'Tutoring'"
        className="w-full pl-12 pr-2 py-2 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;