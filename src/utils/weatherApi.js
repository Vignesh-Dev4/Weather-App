const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather data by city name
 * @param {string} city - City name to search for
 * @returns {Promise<Object>} - Weather data object
 */
export async function fetchWeatherByCity(city) {
    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error('Failed to fetch weather data. Please try again later.');
    }

    return response.json();
}

/**
 * Fetch current weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - Weather data object
 */
export async function fetchWeatherByLocation(lat, lon) {
    const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch weather data for your location.');
    }

    return response.json();
}

/**
 * Fetch 5-day forecast by city name
 * @param {string} city - City name to search for
 * @returns {Promise<Object>} - Forecast data object
 */
export async function fetchForecastByCity(city) {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch forecast data.');
    }

    return response.json();
}

/**
 * Get weather icon URL from icon code
 * @param {string} iconCode - OpenWeatherMap icon code
 * @param {string} size - Icon size (1x, 2x, 4x)
 * @returns {string} - Icon URL
 */
export function getWeatherIconUrl(iconCode, size = '4x') {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}

/**
 * Get user's current location coordinates
 * @returns {Promise<{lat: number, lon: number}>}
 */
export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                reject(new Error('Unable to retrieve your location. Please enable location access.'));
            }
        );
    });
}
