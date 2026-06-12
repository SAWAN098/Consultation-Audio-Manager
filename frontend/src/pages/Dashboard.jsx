import { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import RecordingsTable from '../components/RecordingsTable';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecordings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/recordings');
      setRecordings(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load recordings. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecordings();
  }, [fetchRecordings]);

  const total = recordings.length;
  const pending = recordings.filter((r) => r.status === 'Pending').length;
  const reviewed = recordings.filter((r) => r.status === 'Reviewed').length;
  const completed = recordings.filter((r) => r.status === 'Completed').length;

  return (
    <div className="fade-in-up">
      <div className="mb-8">
        <p className="text-gold-soft/70 uppercase tracking-[0.25em] text-xs mb-1">
          Consultation Archive
        </p>
        <h2 className="font-display text-4xl text-cream">
          {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Recording Dashboard'}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total" value={total} icon="✦" accent="from-violet to-violet/60" />
        <MetricCard label="Pending" value={pending} icon="🌑" accent="from-amber-500 to-amber-400/60" />
        <MetricCard label="Reviewed" value={reviewed} icon="🌗" accent="from-blue-500 to-blue-400/60" />
        <MetricCard label="Completed" value={completed} icon="🌕" accent="from-emerald-500 to-emerald-400/60" />
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mb-3" />
          <p className="text-cream/40 text-sm">Consulting the stars...</p>
        </div>
      ) : (
        <RecordingsTable recordings={recordings} onUpdate={fetchRecordings} />
      )}
    </div>
  );
}

function MetricCard({ label, value, icon, accent }) {
  return (
    <div className="bg-midnight-light/60 border border-violet/20 rounded-2xl p-4 hover:border-gold/30 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
          {label}
        </span>
        <span className="text-lg opacity-70">{icon}</span>
      </div>
      <span className="font-display text-3xl text-cream">{value}</span>
    </div>
  );
}
