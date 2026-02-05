import { getWeatherIconUrl } from '../utils/weatherApi';
import WeatherDetails from './WeatherDetails';
import { MapPin, Calendar } from 'lucide-react';

export default function WeatherCard({ weather }) {
    const iconUrl = getWeatherIconUrl(weather.weather[0].icon);
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="w-full max-w-2xl mx-auto px-4 animate-[fade-in_0.5s_ease-out]">
            <div className="p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30
                      shadow-2xl hover:shadow-3xl transition-all duration-500
                      animate-[pulse-glow_4s_ease-in-out_infinite]">
                {/* Location and Date */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center gap-2 text-white mb-2 md:mb-0">
                        <MapPin className="w-5 h-5 text-red-400" />
                        <h2 className="text-2xl font-bold">
                            {weather.name}, {weather.sys.country}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{currentDate}</span>
                    </div>
                </div>

                {/* Main Weather Display */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                    {/* Weather Icon */}
                    <div className="relative animate-[float_3s_ease-in-out_infinite]">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
                        <img
                            src={iconUrl}
                            alt={weather.weather[0].description}
                            className="w-32 h-32 md:w-40 md:h-40 relative z-10 drop-shadow-2xl"
                        />
                    </div>

                    {/* Temperature */}
                    <div className="text-center md:text-left">
                        <div className="flex items-start justify-center md:justify-start">
                            <span className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">
                                {Math.round(weather.main.temp)}
                            </span>
                            <span className="text-3xl md:text-4xl font-light text-white/80 mt-2">°C</span>
                        </div>
                        <p className="text-xl text-white/80 capitalize mt-2">
                            {weather.weather[0].description}
                        </p>
                        <p className="text-sm text-white/60 mt-1">
                            H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
                        </p>
                    </div>
                </div>

                {/* Weather Details Grid */}
                <WeatherDetails weather={weather} />
            </div>
        </div>
    );
}
