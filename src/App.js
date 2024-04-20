import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Details from './pages/Details';

const App = () => {
  return (
    // relier toutes les pages du site
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/plan' element={<Plan />} />
        <Route path='/details' element={<Details />} />
    </Routes>
    </BrowserRouter>
  );

};

export default App;