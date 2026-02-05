import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function SearchBar({ onSearch, onLocationRequest, loading }) {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto mb-8 px-4">
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Search for a city..."
                            disabled={loading}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/20 backdrop-blur-md
                         border border-white/30 text-white placeholder-white/50
                         focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent
                         transition-all duration-300 shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !city.trim()}
                        className="px-6 py-4 rounded-2xl bg-white/30 backdrop-blur-md
                       text-white font-semibold hover:bg-white/40
                       transition-all duration-300 shadow-lg hover:shadow-xl
                       hover:scale-105 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={onLocationRequest}
                        disabled={loading}
                        className="p-4 rounded-2xl bg-white/30 backdrop-blur-md
                       text-white hover:bg-white/40
                       transition-all duration-300 shadow-lg hover:shadow-xl
                       hover:scale-105 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        title="Use my location"
                        aria-label="Use my location"
                    >
                        <MapPin className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
