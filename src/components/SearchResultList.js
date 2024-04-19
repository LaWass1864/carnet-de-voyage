import React from 'react';

const SearchResultsList = ({ results }) => {
  return (
    <div>
      <h2>Plan de voyage</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <div>Date: {result.date}</div>
            <div>Content: {result.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsList;
