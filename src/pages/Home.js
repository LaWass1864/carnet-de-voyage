import React from 'react';

const Home = () => {
    return (

       <div className="min-h-screen flex items-center bg-purple-500">
  <ul className='flex-1 max-w-4xl mx-auto p-10'>
    <li className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      <li className="bg-red-400 row-span-5 h-24">1</li>
      <li className="bg-green-400 col-span-2 row-span-3 h-24">2</li>
      <li className="bg-gray-400 col-span-3 row-span-2 col-start-2 row-start-4 h-24">3</li>
      <li className="bg-blue-400 row-span-3 col-start-4 row-start-1 h-24">4</li>
    </li>
  </ul>
</div>

    );
};

export default Home;