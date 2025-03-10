export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export interface HealthAdvice {
  title: string;
  advice: string;
  icon: string;
}

export interface City {
  name: string;
  displayName: string;
}