const OWM_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE = 'https://api.openweathermap.org';

if (!OWM_API_KEY) {
  // Non-fatal: UI should surface missing key gracefully
  console.warn('REACT_APP_OPENWEATHERMAP_API_KEY is not set. Weather calls will fail until configured.');
}

// PUBLIC_INTERFACE
export async function geocodeCity(q) {
  /**
   * Geocode a city name to lat/lon using OpenWeatherMap Geocoding API.
   * Params: q (string) - city text
   * Returns: { lat, lon, name, country, state }
   */
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${OWM_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data.length) throw new Error('Location not found');
  const { lat, lon, name, country, state } = data[0];
  return { lat, lon, name, country, state };
}

// PUBLIC_INTERFACE
export async function getWeatherOneCall({ lat, lon, units = 'metric' }) {
  /**
   * Fetch weather using OpenWeather One Call 3.0 API.
   * Params: { lat, lon, units } where units in ['metric','imperial']
   * Returns: JSON response from API.
   */
  const url = `${BASE}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${OWM_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  return res.json();
}
