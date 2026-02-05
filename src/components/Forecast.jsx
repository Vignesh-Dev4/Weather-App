import { getWeatherIconUrl } from '../utils/weatherApi';

export default function Forecast({ forecastData }) {
    // Get one forecast per day (every 8th item = 24 hours, since data is every 3 hours)
    const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

    const formatDay = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 mt-6 animate-[fade-in_0.6s_ease-out]">
            <h3 className="text-white/80 text-lg font-semibold mb-4 flex items-center gap-2">
                <span>📅</span> 5-Day Forecast
            </h3>

            <div className="grid grid-cols-5 gap-2 md:gap-4">
                {dailyForecasts.map((day, index) => (
                    <div
                        key={day.dt}
                        className="p-3 md:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20
                       hover:bg-white/20 transition-all duration-300 text-center
                       animate-[fade-in_0.4s_ease-out]"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <p className="text-white/70 text-xs md:text-sm font-medium mb-2">
                            {formatDay(day.dt)}
                        </p>
                        <img
                            src={getWeatherIconUrl(day.weather[0].icon, '2x')}
                            alt={day.weather[0].description}
                            className="w-10 h-10 md:w-12 md:h-12 mx-auto"
                        />
                        <p className="text-white font-bold text-sm md:text-base mt-1">
                            {Math.round(day.main.temp)}°
                        </p>
                        <p className="text-white/50 text-xs hidden md:block capitalize truncate">
                            {day.weather[0].main}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
