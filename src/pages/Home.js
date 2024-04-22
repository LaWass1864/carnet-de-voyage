import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data.json'; // Importez les données depuis le fichier data.json
import Navigation from '../components/Navigation';

const Home = () => {
  const [informationsVol, setInformationsVol] = useState([]);
  const [locationVoiture, setLocationVoiture] = useState({});
  const [prenomUtilisateur, setPrenomUtilisateur] = useState('');
  const [numeroSiege, setNumeroSiege] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer l'ID de l'utilisateur connecté à partir du stockage local
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Rechercher les informations de l'utilisateur dans les données importées
      const utilisateur = data.utilisateurs.find(utilisateur => utilisateur.id === userId);
      if (utilisateur) {
        setPrenomUtilisateur(utilisateur.prenom_utilisateur);
        setNumeroSiege(utilisateur.numero_siege);
      }
    } else {
      // Rediriger l'utilisateur vers la page de connexion si aucun ID d'utilisateur n'est trouvé
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const { informations_vol, locations_de_voiture } = data;

    // Mettre à jour les états avec les informations pertinentes
    setInformationsVol(informations_vol);
    setLocationVoiture(locations_de_voiture[0]); // Supposant qu'il y ait toujours une seule location de voiture pour chaque utilisateur

  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Navigation />
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-2xl font-semibold mb-6">Hello, {prenomUtilisateur}</h1>
        {/* Informations du Vol */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Informations du Vol</h2>
          {informationsVol.map((vol) => (
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
          <p><strong>Numéro de siège :</strong> {numeroSiege}</p>
          {/* Affichage du numéro de siège */}
        </div>

        {/* Location de Voiture */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Location de Voiture</h2>
          {Object.entries(locationVoiture)
            .filter(([key]) => key !== 'id')
            .map(([key, value]) => (
              <p key={key}>
                <span className="font-semibold">{capitalizeFirstLetter(key.replace(/_/g, ' '))} :</span> {capitalizeFirstLetter(value)}
              </p>
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
