import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setSearchResults(response.data); // La réponse contient des informations sur tous les pays et leurs villes principales
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filterResults = (results, term) => {
    return results.filter((result) =>
      typeof result.capital === 'string' && result.capital.toLowerCase().startsWith(term.toLowerCase())
    );
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for a city" 
        value={searchTerm} 
        onChange={handleChange} 
      />
      <ul>
        {filterResults(searchResults, searchTerm).map((result, index) => (
          <li key={index}>{result.capital}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
