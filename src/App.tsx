import { useState, useEffect } from "react";
import axios from "axios";
import { Cloud, MapPin } from "lucide-react";
import { WeatherCard } from "./components/WeatherCard";
import { HealthAdviceCard } from "./components/HealthAdvice";
import { beninCities } from "./data/cities";
import { motion } from "framer-motion";
import SearchBar from "./components/search";

function App() {
  const [weatherData, setWeatherData] = useState(new Map<string, any>());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherForAllCities = async () => {
      try {
        console.log("Début du chargement des données météo...");
        const API_KEY = "d0ae24e4a56cc31b1152b0926fa1e3e8";
        const newWeatherData = new Map<string, any>();

        for (const city of beninCities) {
          try {
            console.log(`Récupération des données pour ${city.name}...`);
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city.name},bj&units=metric&appid=${API_KEY}`
            );
            console.log(`Données reçues pour ${city.name}:`, response.data);
            newWeatherData.set(city.name, response.data);
          } catch (err) {
            console.error(`Erreur pour la ville ${city.name}:`, err);
          }
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause de 1 seconde
        }

        if (newWeatherData.size === 0) {
          throw new Error("Aucune donnée météo récupérée.");
        }

        setWeatherData(newWeatherData);
      } catch (err: any) {
        console.error("Erreur API météo globale :", err);
        setError(err.message || "Impossible de charger les données météo.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherForAllCities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Cloud className="w-12 h-12 text-blue-500 animate-bounce mx-auto" />
        <p className="mt-4 text-gray-600">Chargement des données...</p>
      </div>
    );
  }

  if (error || weatherData.size === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || "Une erreur est survenue lors du chargement."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Météo & Santé au Bénin
          </h1>
          <div className="flex items-center justify-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <p>Principales villes du Bénin</p>
          </div>
        </header>

        {/* Barre de recherche */}
        <SearchBar onSelectCity={setSelectedCity} />

        {/* Affichage des données */}
        <div className="mt-6">
          {selectedCity ? (
            (() => {
              const weather = weatherData.get(selectedCity);
              if (!weather) return null;

              return (
                <motion.div
                  key={selectedCity}
                  className="space-y-4 mx-auto max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      {selectedCity}
                    </h2>
                    <WeatherCard weather={weather} />
                    <HealthAdviceCard weather={weather} />
                  </div>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="block mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Retour
                  </button>
                </motion.div>
              );
            })()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beninCities.map((city) => {
                const weather = weatherData.get(city.name);
                if (!weather) return null;

                return (
                  <motion.div
                    key={city.name}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl"
                      onClick={() => setSelectedCity(city.name)}
                    >
                      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        {city.displayName}
                      </h2>
                      <WeatherCard weather={weather} />
                      <HealthAdviceCard weather={weather} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;