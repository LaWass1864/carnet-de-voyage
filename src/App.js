import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Details from './pages/Details';
import Login from './pages/Login';

const App = () => {
  // Vérifiez ici s'il y a une session active ou non
  const isAuthenticated = false; // Remplacez par la logique réelle de vérification de l'authentification

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige vers la page de connexion si l'utilisateur n'est pas authentifié */}
        {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}
        {/* Définition des autres routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/home/:seatNumber" element={<Home />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
