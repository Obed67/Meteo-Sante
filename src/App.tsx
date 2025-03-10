import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, MapPin } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { HealthAdviceCard } from './components/HealthAdvice';
import { beninCities } from './data/cities';
import type { WeatherData } from './types';
import { motion } from 'framer-motion'; // Import de Framer Motion

function App() {
  const [weatherData, setWeatherData] = useState<Map<string, WeatherData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherForAllCities = async () => {
      try {
        const API_KEY = 'd0ae24e4a56cc31b1152b0926fa1e3e8';
        const weatherPromises = beninCities.map(city =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name},bj&units=metric&appid=${API_KEY}`
          )
        );

        const responses = await Promise.all(weatherPromises);
        const newWeatherData = new Map();
        responses.forEach((response, index) => {
          newWeatherData.set(beninCities[index].name, response.data);
        });

        setWeatherData(newWeatherData);
        setLoading(false);
      } catch (err) {
        setError('Impossible de charger les données météo');
        setLoading(false);
      }
    };

    fetchWeatherForAllCities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-12 h-12 text-blue-500 animate-bounce mx-auto" />
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error || weatherData.size === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || 'Une erreur est survenue'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Météo & Santé au Bénin</h1>
          <div className="flex items-center justify-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <p>Principales villes du Bénin</p>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beninCities.map(city => {
            const weather = weatherData.get(city.name);
            if (!weather) return null;
            
            const randomDelay = Math.random() * 1;

            return (
              <motion.div 
                key={city.name} 
                className="space-y-4" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 3, delay: randomDelay }}
              >
                <div className="bg-white rounded-xl shadow-lg p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    {city.displayName}
                  </h2>
                  <WeatherCard weather={weather} />
                  <HealthAdviceCard weather={weather} />
                </div>
              </motion.div>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;