function dayName(ts) { return new Date(ts*1000).toLocaleDateString(undefined, { weekday: 'short' }); }

// PUBLIC_INTERFACE
export default function ForecastGrid({ daily, units='metric' }) {
  /**
   * Displays a 7-day forecast grid from OpenWeather daily array.
   * Props:
   * - daily: daily weather array
   * - units: 'metric' | 'imperial'
   */
  if (!daily?.length) {
    return (
      <div className="card">
        <div className="card-header">7-Day Forecast</div>
        <div className="card-body"><div className="muted">No forecast yet.</div></div>
      </div>
    );
  }
  const u = units === 'imperial' ? '°F' : '°C';
  return (
    <div className="card">
      <div className="card-header">7-Day Forecast</div>
      <div className="card-body forecast-grid">
        {daily.slice(0,7).map((d, i) => (
          <div key={i} className="forecast-item">
            <div className="muted">{dayName(d.dt)}</div>
            <div style={{fontWeight:700, fontSize:18}}>{Math.round(d.temp.max)}{u} / {Math.round(d.temp.min)}{u}</div>
            <div className="muted">{d.weather?.[0]?.main}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
