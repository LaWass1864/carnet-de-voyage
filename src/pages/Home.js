import React, { useEffect, useState } from 'react';
import data from '../data.json';
import Navigation from '../components/Navigation';

const Home = () => {
  const { informations_vol, locations_de_voiture, utilisateurs } = data;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Récupérer l'ID de l'utilisateur connecté depuis le stockage local
    const userId = localStorage.getItem('userId');

    // Trouver l'entrée correspondante dans les données utilisateur
    const connectedUser = utilisateurs.find(user => user.id === userId);

    // Récupérer le prénom de l'utilisateur connecté
    if (connectedUser) {
      setFirstName(connectedUser.prenom_utilisateur);
    }
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="max-w-3xl w-full p-6">
          {/* Titre avec le prénom de l'utilisateur */}
          <h1 className="text-2xl font-bold mb-4">Hello, {firstName}</h1>
          
          {/* Informations du Vol */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Informations du Vol</h2>
            {informations_vol.map((vol) => (
              <div key={vol.id} className="mb-4">
                {Object.entries(vol)
                  .filter(([key]) => key !== 'id')
                  .map(([key, value]) => (
                    <p key={key}>
                      <span className="font-semibold">{capitalizeFirstLetter(key.replace(/_/g, ' '))} :</span> {capitalizeFirstLetter(value)}
                    </p>
                  ))}
              </div>
            ))}
          </div>

          {/* Location de Voiture */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Location de Voiture</h2>
            {locations_de_voiture.map((location) => (
              <div key={location.id} className="mb-4">
                {Object.entries(location)
                  .filter(([key]) => key !== 'id')
                  .map(([key, value]) => (
                    <p key={key}>
                      <span className="font-semibold">{capitalizeFirstLetter(key.replace(/_/g, ' '))} :</span> {capitalizeFirstLetter(value)}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
