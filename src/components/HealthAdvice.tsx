import React from 'react';
import { Sun, Umbrella, Droplet } from 'lucide-react';
import type { WeatherData, HealthAdvice } from '../types';

interface HealthAdviceProps {
  weather: WeatherData;
}

export const HealthAdviceCard: React.FC<HealthAdviceProps> = ({ weather }) => {
  const getHealthTip = (): HealthAdvice => {
    const temp = weather.main.temp;
    if (temp > 30) {
      return {
        title: 'Conseil Santé',
        advice: 'Buvez beaucoup d\'eau et évitez les activités intenses',
        icon: 'Droplet'
      };
    }
    if (temp > 25) {
      return {
        title: 'Conseil Santé',
        advice: 'Hydratez-vous régulièrement',
        icon: 'Droplet'
      };
    }
    return {
      title: 'Conseil Santé',
      advice: 'Température idéale pour les activités',
      icon: 'Heart'
    };
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'Wind':
        return <Umbrella className="w-5 h-5 text-blue-500" />;
      default:
        return <Droplet className="w-5 h-5 text-teal-500" />;
    }
  };

  const advice = getHealthTip();

  return (
    <div className="bg-gray-50 rounded-lg p-3 mt-2">
      <div className="flex items-center space-x-2">
        {renderIcon(advice.icon)}
        <p className="text-sm text-gray-600">{advice.advice}</p>
      </div>
    </div>
  );
};