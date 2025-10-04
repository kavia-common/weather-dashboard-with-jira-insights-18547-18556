import { useEffect, useMemo, useState } from 'react';
import './index.css';
import LocationSearch from './components/LocationSearch';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastGrid from './components/ForecastGrid';
import JiraInsightsPlaceholder from './components/JiraInsightsPlaceholder';
import { geocodeCity, getWeatherOneCall } from './services/weatherService';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Weather Dashboard main component.
   * - Provides location search and unit toggle
   * - Fetches OpenWeatherMap data (geocoding + One Call 3.0)
   * - Renders current weather and 7-day forecast
   * - Shows Jira insights placeholder
   */
  const [query, setQuery] = useState('');
  const [coords, setCoords] = useState(null);
  const [units, setUnits] = useState('metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

  const locationLabel = useMemo(() => {
    if (!coords?.label) return '';
    return coords.label;
  }, [coords]);

  useEffect(() => {
    function onSearch(e) {
      const q = e.detail;
      setQuery(q);
    }
    window.addEventListener('location-search', onSearch);
    return () => window.removeEventListener('location-search', onSearch);
  }, []);

  useEffect(() => {
    async function run() {
      if (!query) return;
      setLoading(true); setError('');
      try {
        const cached = localStorage.getItem(`geo:${query.toLowerCase()}`);
        let g;
        if (cached) { g = JSON.parse(cached); }
        else {
          g = await geocodeCity(query);
          localStorage.setItem(`geo:${query.toLowerCase()}` , JSON.stringify(g));
        }
        setCoords({ lat: g.lat, lon: g.lon, label: [g.name, g.state, g.country].filter(Boolean).join(', ') });
        const w = await getWeatherOneCall({ lat: g.lat, lon: g.lon, units });
        setWeather(w);
      } catch (e) {
        setError(e.message || 'Failed to fetch weather');
        setCoords(null);
        setWeather(null);
      } finally { setLoading(false); }
    }
    run();
  }, [query, units]);

  return (
    <div>
      <header className="header">
        <div className="header-inner container">
          <div className="brand">
            <span>🌤️ Weather Dashboard</span>
            <span className="badge">Ocean Professional</span>
          </div>
          <LocationSearch onLocation={setQuery} />
          <div style={{display:'flex', gap:8}}>
            <button className="button" onClick={() => setUnits(u=>u==='metric'?'imperial':'metric')} aria-label="Toggle units">
              {units === 'metric' ? '°C' : '°F'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        {error && <div className="error" role="alert" style={{margin:'12px 0'}}>{error}</div>}
        {loading && <div style={{display:'flex', alignItems:'center', gap:8}}><div className="spinner"/> Loading...</div>}

        <div className="grid">
          <div>
            <CurrentWeatherCard locationLabel={locationLabel} current={weather?.current} daily={weather?.daily} units={units} />
            <div style={{height:16}} />
            <ForecastGrid daily={weather?.daily} units={units} />
          </div>
          <JiraInsightsPlaceholder />
        </div>
      </main>
    </div>
  );
}
