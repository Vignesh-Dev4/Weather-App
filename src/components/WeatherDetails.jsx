import { getWeatherIconUrl } from '../utils/weatherApi';
import { Droplets, Wind, Thermometer, Gauge } from 'lucide-react';

export default function WeatherDetails({ weather }) {
    const details = [
        {
            icon: Thermometer,
            label: 'Feels Like',
            value: `${Math.round(weather.main.feels_like)}°C`,
            color: 'text-orange-300',
        },
        {
            icon: Droplets,
            label: 'Humidity',
            value: `${weather.main.humidity}%`,
            color: 'text-blue-300',
        },
        {
            icon: Wind,
            label: 'Wind Speed',
            value: `${(weather.wind.speed * 3.6).toFixed(1)} km/h`,
            color: 'text-teal-300',
        },
        {
            icon: Gauge,
            label: 'Pressure',
            value: `${weather.main.pressure} hPa`,
            color: 'text-purple-300',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {details.map((detail, index) => (
                <div
                    key={detail.label}
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20
                     hover:bg-white/20 transition-all duration-300
                     animate-[fade-in_0.4s_ease-out]"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex flex-col items-center text-center">
                        <detail.icon className={`w-6 h-6 ${detail.color} mb-2`} />
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                            {detail.label}
                        </p>
                        <p className="text-white font-bold text-lg">
                            {detail.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
