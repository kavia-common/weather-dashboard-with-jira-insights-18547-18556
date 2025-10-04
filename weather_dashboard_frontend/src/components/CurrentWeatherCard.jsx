 // PUBLIC_INTERFACE
export default function CurrentWeatherCard({ locationLabel, current, daily, units='metric' }) {
  /**
   * Displays current weather KPIs for the selected location.
   * Props:
   * - locationLabel: string rendered as badge
   * - current: OpenWeather current object
   * - daily: daily array (unused here but reserved for future)
   * - units: 'metric' | 'imperial'
   */
  if (!current) {
    return (
      <div className="card">
        <div className="card-header">Current Weather</div>
        <div className="card-body"><div className="muted">Search a city to see current conditions.</div></div>
      </div>
    );
  }

  const temp = Math.round(current.temp);
  const feels = Math.round(current.feels_like);
  const wind = Math.round(current.wind_speed);
  const humidity = current.humidity;
  const u = units === 'imperial' ? '°F' : '°C';
  const ws = units === 'imperial' ? 'mph' : 'm/s';

  return (
    <div className="card">
      <div className="card-header">
        <span>Current Weather</span>
        <span className="badge">{locationLabel}</span>
      </div>
      <div className="card-body">
        <div className="kpis">
          <div className="kpi"><div className="muted">Temp</div><div style={{fontSize:24,fontWeight:700}}>{temp}{u}</div></div>
          <div className="kpi"><div className="muted">Feels like</div><div style={{fontSize:24,fontWeight:700}}>{feels}{u}</div></div>
          <div className="kpi"><div className="muted">Wind</div><div style={{fontSize:24,fontWeight:700}}>{wind} {ws}</div></div>
          <div className="kpi"><div className="muted">Humidity</div><div style={{fontSize:24,fontWeight:700}}>{humidity}%</div></div>
        </div>
      </div>
    </div>
  );
}
