import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Selector from "../components/Selector";

const Plan = () => {
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState(Country.getCountryByCode("US"));
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [blogData, setBlogData] = useState([]);
    const [content, setContent] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country]);

    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [state]);

    useEffect(() => {
        // Charger les données depuis le stockage local lors du chargement de l'application
        const storedBlogData = localStorage.getItem("blogData");
        if (storedBlogData) {
            setBlogData(JSON.parse(storedBlogData));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR');
        const newBlogEntry = {
            country: country.name,
            state: state.name,
            city: city.name,
            date: formattedDate
        };

        let updatedBlogData = [];

        if (editingIndex !== -1) {
            updatedBlogData = [...blogData];
            updatedBlogData[editingIndex] = newBlogEntry;
            setEditingIndex(-1);
        } else {
            updatedBlogData = [...blogData, newBlogEntry];
        }

        // Enregistrer les données dans le stockage local avec la nouvelle valeur de blogData
        localStorage.setItem("blogData", JSON.stringify(updatedBlogData));

        // Mettre à jour l'état avec la nouvelle valeur de blogData
        setBlogData(updatedBlogData);

        setCountry(Country.getCountryByCode("US"));
        setState({});
        setCity({});
        setSelectedDate("");
    };

    const handleEdit = (index) => {
        const entryToEdit = blogData[index];
        setCountry({ name: entryToEdit.country });
        setState({ name: entryToEdit.state });
        setCity({ name: entryToEdit.city });
        setSelectedDate(entryToEdit.date);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const newBlogData = [...blogData];
        newBlogData.splice(index, 1);
        setBlogData(newBlogData);

        // Enregistrer les données mises à jour dans le stockage local
        localStorage.setItem("blogData", JSON.stringify(newBlogData));
    };

    return (
        <section className="min-h-screen px-3 grid place-items-center pb-20 selection:text-white selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500">
            <div>
                <h2 className="text-2xl font-bold text-teal-900">
                    Sélectionnez un pays, un état et une ville
                </h2>
                <br />
                <div className="bg-teal-300 rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
                        <div>
                            <p className="text-teal-800 font-semibold">Pays :</p>
                            <Selector
                                data={countryData}
                                selected={country}
                                setSelected={setCountry}
                            />
                        </div>
                        {state && (
                            <div>
                                <p className="text-teal-800 font-semibold">Région/Etat :</p>
                                <Selector
                                    data={stateData}
                                    selected={state}
                                    setSelected={setState}
                                />
                            </div>
                        )}
                        {city && (
                            <div>
                                <p className="text-teal-800 font-semibold">Ville :</p>
                                <Selector data={cityData} selected={city} setSelected={setCity} />
                            </div>
                        )}
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
                            {editingIndex !== -1 ? "Modifier" : "Ajouter"}
                        </button>
                    </form>
                    <div>
                        {blogData.map((entry, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded mt-4">
                                <p><strong>Pays:</strong> {entry.country}</p>
                                <p><strong>Région/Etat:</strong> {entry.state}</p>
                                <p><strong>Ville:</strong> {entry.city}</p>
                                <p><strong>Date:</strong> {entry.date}</p>
                                <div className="flex items-center mt-2">
                                    <FontAwesomeIcon icon={faEdit} className="text-teal-600 cursor-pointer mr-2" onClick={() => handleEdit(index)} />
                                    <FontAwesomeIcon icon={faTrash} className="text-red-600 cursor-pointer" onClick={() => handleDelete(index)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Plan;
