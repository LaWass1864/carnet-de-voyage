import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data.json'; // Importez les données depuis le fichier data.json

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Recherchez l'utilisateur dans les données importées
    const utilisateur = data.utilisateurs.find(utilisateur => utilisateur.nom_utilisateur === username);
    // Vérifiez si l'utilisateur existe et si le mot de passe est correct
    if (utilisateur && utilisateur.mot_de_passe === password) {
      // Redirigez l'utilisateur vers la page d'accueil après la connexion réussie
      navigate(`/home/${utilisateur.numero_siege}`);
    } else {
      // Affichez un message d'erreur si les identifiants sont incorrects
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded-md font-semibold hover:bg-indigo-600"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
