// src/components/Search.jsx
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = ({ data, onSearch, type }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    let filteredData = [];

    if (type === 's') {
      filteredData = data.filter(student =>
        (student.first_name + ' ' + student.last_name + ' ' + student.id)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    } else if (type === 'c') {
      filteredData = data.filter(course =>
        (course.course_name + ' ' + course.course_description + ' ' + course.course_id)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    } else {
      filteredData = data.filter(teacher =>
        (teacher.first_name + ' ' + teacher.last_name + ' ' + teacher.teacher_id )
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    onSearch(filteredData); // Send filtered data back to parent
  }, [query, data, onSearch, type]);

  return (
    <div className="relative flex items-center mt-2">
      <input
        type="text"
        placeholder="Search by ID or Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-60 max-w-sm py-2 px-4 pr-10 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-4 text-gray-500 hover:text-gray-700">
        <FiSearch size={20} />
      </button>
    </div>
  );
};

export default Search;
