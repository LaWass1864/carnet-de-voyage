import React, { useState } from 'react';
import SearchInput from './components/SearchInput';
import DateInput from './components/DateInput';
import SearchResultsList from './components/SearchResultList';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    // Simuler une recherche avec la date actuelle
    const currentDate = new Date().toLocaleDateString();
    const newSearchResult = { date: currentDate, content: searchTerm };
    setSearchResults([...searchResults, newSearchResult]);
  };

  return (
    <div>
      <h1>Plan de voyage</h1>
      <SearchInput onSearch={handleSearch} />
      <DateInput />
      <SearchResultsList results={searchResults} />
    </div>
  );
};

export default App;
