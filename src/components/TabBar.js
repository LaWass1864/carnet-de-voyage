import React from 'react';
import { Link } from 'react-router-dom';

const TabBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-200 p-4 flex justify-between">
      <Link to="/" className="text-blue-600 hover:text-blue-800 p-2">Home</Link>
      <Link to="/plan" className="text-blue-600 hover:text-blue-800 p-2">Plan</Link>
    </nav>
  );
};

export default TabBar;
