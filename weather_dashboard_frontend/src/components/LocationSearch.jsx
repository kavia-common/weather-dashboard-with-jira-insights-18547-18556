import { useState } from 'react';

// PUBLIC_INTERFACE
export default function LocationSearch({ onLocation }) {
  /** Search bar to dispatch a city query to parent App. */
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!q.trim()) return;
    setLoading(true);
    try {
      const evt = new CustomEvent('location-search', { detail: q.trim() });
      window.dispatchEvent(evt);
      onLocation?.(q.trim());
    } catch (e) {
      setError('Unable to search.');
    } finally { setLoading(false); }
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit} aria-label="Search location">
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city (e.g., London)" aria-label="City" />
      <button className="button" disabled={loading}>
        {loading ? <span className="spinner" aria-label="Loading"/> : 'Search'}
      </button>
      {error && <div className="error" role="alert">{error}</div>}
    </form>
  );
}
