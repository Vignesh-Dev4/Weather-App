export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-16 animate-[fade-in_0.3s_ease-out]">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white 
                        animate-spin" />
                {/* Inner ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-10 h-10 rounded-full border-4 border-white/10 border-b-white/60
                        animate-[spin_0.8s_linear_infinite_reverse]" />
            </div>
            <p className="mt-6 text-white/80 text-lg font-medium">
                Fetching weather data...
            </p>
            <p className="mt-2 text-white/50 text-sm">
                Just a moment
            </p>
        </div>
    );
}
