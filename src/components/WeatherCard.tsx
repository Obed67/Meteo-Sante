import React from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-red-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Temp.</p>
            <p className="text-base font-semibold">{Math.round(weather.main.temp)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Humid.</p>
            <p className="text-base font-semibold">{weather.main.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="text-gray-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Vent</p>
            <p className="text-base font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};