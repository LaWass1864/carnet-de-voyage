import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Selector from "../components/Selector";

const App = () => {
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState(Country.getCountryByCode("US"));
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [blogData, setBlogData] = useState([]);
    const [content, setContent] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country]);

    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [state]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlogEntry = {
            country: country.name,
            state: state.name,
            city: city.name,
            date: selectedDate
        };
        setBlogData([...blogData, newBlogEntry]);
        setContent(""); // Clear input field
    };

    return (
        <section className="min-h-screen px-3 grid place-items-center pb-20 selection:text-white selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500">
            <div>
                <h2 className="text-2xl font-bold text-teal-900">
                    Selectionnez un pays, un état et une ville
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
                            Ajouter
                        </button>
                    </form>
                    <div>
                        {blogData.map((entry, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded mt-4">
                                <p><strong>Pays:</strong> {entry.country}</p>
                                <p><strong>Région/Etat:</strong> {entry.state}</p>
                                <p><strong>Ville:</strong> {entry.city}</p>
                                <p><strong>Date:</strong> {entry.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default App;
