import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
    return (
        <div className="w-full max-w-md mx-auto px-4 animate-[fade-in_0.3s_ease-out]">
            <div className="p-6 rounded-3xl bg-red-500/20 backdrop-blur-md border border-red-400/30
                      shadow-lg">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/30 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-300" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">
                        Oops! Something went wrong
                    </h3>

                    <p className="text-red-200 mb-6">
                        {message}
                    </p>

                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-white/20 hover:bg-white/30 text-white font-medium
                         transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
