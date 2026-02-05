import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import {
  fetchWeatherByCity,
  fetchWeatherByLocation,
  fetchForecastByCity,
  getUserLocation,
} from './utils/weatherApi';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or default to system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [lastCity, setLastCity] = useState('');

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setLastCity(city);

    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const { lat, lon } = await getUserLocation();
      const weather = await fetchWeatherByLocation(lat, lon);
      setWeatherData(weather);
      setLastCity(weather.name);

      // Fetch forecast by city name since we got it from location
      const forecast = await fetchForecastByCity(weather.name);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastCity) {
      handleSearch(lastCity);
    }
  };

  // Dynamic background gradient based on dark mode
  const bgGradient = darkMode
    ? 'from-gray-900 via-purple-900 to-gray-900'
    : 'from-blue-400 via-purple-500 to-pink-500';

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgGradient} 
                  transition-all duration-700 ease-in-out`}
    >
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl
                        ${darkMode ? 'bg-purple-500/10' : 'bg-white/10'}`} />
        <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl
                        ${darkMode ? 'bg-blue-500/10' : 'bg-white/10'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[600px] h-[600px] rounded-full blur-3xl
                        ${darkMode ? 'bg-indigo-500/5' : 'bg-yellow-200/10'}`} />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen py-8">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <SearchBar
          onSearch={handleSearch}
          onLocationRequest={handleLocationRequest}
          loading={loading}
        />

        <main className="mt-8">
          {loading && <LoadingSpinner />}

          {error && !loading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {weatherData && !loading && !error && (
            <>
              <WeatherCard weather={weatherData} />
              {forecastData && <Forecast forecastData={forecastData} />}
            </>
          )}

          {!weatherData && !loading && !error && (
            <div className="text-center py-16 animate-[fade-in_0.5s_ease-out]">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Search for a city
              </h2>
              <p className="text-white/60 max-w-md mx-auto">
                Enter a city name to get the current weather conditions and 5-day forecast,
                or use your location for automatic detection.
              </p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
