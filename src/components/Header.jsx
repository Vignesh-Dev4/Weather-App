import { Sun, Moon } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
    return (
        <header className="w-full max-w-2xl mx-auto mb-8 px-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🌤️</span>
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            Weather App
                        </h1>
                        <p className="text-white/70 text-sm">Real-time weather updates</p>
                    </div>
                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     hover:scale-105 active:scale-95"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? (
                        <Sun className="w-6 h-6 text-yellow-300" />
                    ) : (
                        <Moon className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>
        </header>
    );
}
