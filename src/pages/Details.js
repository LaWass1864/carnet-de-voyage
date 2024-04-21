import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

const Details = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Récupération des tâches depuis le stockage local lors du chargement de la page
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Sauvegarde des tâches dans le stockage local à chaque modification
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name, address, date: new Date(selectedDate).toLocaleDateString('fr-FR') };
    setTasks([...tasks, newTask]);
    setName('');
    setAddress('');
    setSelectedDate('');
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('/'));
    const dateB = new Date(b.date.split('/').reverse().join('/'));
    return dateA - dateB;
  });

  return (
    <>
      <Navigation />
      <section className="min-h-screen px-3 grid place-items-center pb-20 selection:text-white selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500">
        <div>
          <h2 className="text-2xl font-bold text-teal-900">
            Ajouter un hébergement
          </h2>
          <br />
          <div className="bg-teal-300 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-teal-800 font-semibold">Nom :</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <p className="text-teal-800 font-semibold">Adresse :</p>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <p className="text-teal-800 font-semibold">Date :</p>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:border-teal-500"
                />
              </div>
              <button type="submit" className="bg-teal-600 text-white py-2 px-4 rounded mt-4 md:col-span-3">
                Ajouter
              </button>
            </form>
            <div>
              {/* Display Tasks */}
              {sortedTasks.map((task, index) => (
                <div key={index} className="border p-4 rounded mt-4">
                  <p><strong>Nom :</strong> {task.name}</p>
                  <p><strong>Adresse :</strong> {task.address}</p>
                  <p><strong>Date :</strong> {task.date}</p>
                  <button className="bg-red-600 text-white py-2 px-4 rounded mt-2" onClick={() => handleDelete(index)}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
