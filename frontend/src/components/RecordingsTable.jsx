import { useState, useMemo } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const statusMeta = {
  Pending: { icon: '🌑', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  Reviewed: { icon: '🌗', badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  Completed: { icon: '🌕', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
};

const STATUS_OPTIONS = ['Pending', 'Reviewed', 'Completed'];

const getAudioSrc = (fileUrl) => {
  if (!fileUrl) return '';

  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;

  const normalizedPath = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
  return `http://localhost:5000${normalizedPath}`;
};

export default function RecordingsTable({ recordings, onUpdate }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [activeNotes, setActiveNotes] = useState({});
  const [savingId, setSavingId] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return recordings;
    const q = search.toLowerCase();
    return recordings.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.clientName.toLowerCase().includes(q)
    );
  }, [search, recordings]);

  const togglePlay = (id) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const changeStatus = async (recording, newStatus) => {
    try {
      await api.put(`/recordings/${recording._id}`, { status: newStatus });
      onUpdate();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const saveNotes = async (id) => {
    try {
      setSavingId(id);
      await api.put(`/recordings/${id}`, { notes: activeNotes[id] });
      onUpdate();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save notes');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this recording permanently?')) return;
    try {
      await api.delete(`/recordings/${id}`);
      onUpdate();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete recording');
    }
  };

  return (
    <div className="bg-midnight-light/50 border border-violet/20 rounded-2xl p-4 md:p-6 fade-in-up">
      {/* Search bar */}
      <div className="mb-5 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30">🔍</span>
        <input
          type="text"
          placeholder="Search by client name or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 bg-midnight/60 border border-violet/30 rounded-full pl-11 pr-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-violet/20 text-xs text-cream/40 uppercase tracking-wider">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Client</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Created</th>
              <th className="py-2 px-3">Play</th>
              {user && <th className="py-2 px-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((rec, idx) => {
              const meta = statusMeta[rec.status] || statusMeta.Pending;
              return (
                <FragmentRow
                  key={rec._id}
                  rec={rec}
                  meta={meta}
                  idx={idx}
                  user={user}
                  isOpen={playingId === rec._id}
                  togglePlay={() => togglePlay(rec._id)}
                  changeStatus={changeStatus}
                  saveNotes={saveNotes}
                  handleDelete={handleDelete}
                  activeNotes={activeNotes}
                  setActiveNotes={setActiveNotes}
                  savingId={savingId}
                />
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={user ? 6 : 5} className="py-10 text-center text-cream/30 font-display text-lg">
                  ✦ No recordings found in the archive ✦
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentRow({
  rec, meta, idx, user, isOpen, togglePlay, changeStatus, saveNotes,
  handleDelete, activeNotes, setActiveNotes, savingId,
}) {
  return (
    <>
      <tr
        className="border-b border-violet/10 hover:bg-midnight/40 text-sm transition-colors fade-in-up"
        style={{ animationDelay: `${idx * 40}ms` }}
      >
        <td className="py-3 px-3 font-medium text-cream">{rec.title}</td>
        <td className="py-3 px-3 text-cream/70">{rec.clientName}</td>
        <td className="py-3 px-3">
          {user ? (
            <div className="relative inline-block">
              <select
                value={rec.status}
                onChange={(e) => changeStatus(rec, e.target.value)}
                className={`appearance-none pl-7 pr-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${meta.badge} bg-midnight focus:outline-none focus:ring-2 focus:ring-gold/40`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-midnight text-cream">
                    {s}
                  </option>
                ))}
              </select>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none">
                {meta.icon}
              </span>
            </div>
          ) : (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${meta.badge}`}>
              {meta.icon} {rec.status}
            </span>
          )}
        </td>
        <td className="py-3 px-3 text-cream/40 text-xs whitespace-nowrap">
          {new Date(rec.createdAt).toLocaleDateString(undefined, {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </td>
        <td className="py-3 px-3">
          <button
            onClick={togglePlay}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              isOpen
                ? 'bg-violet text-cream'
                : 'bg-gold/90 text-midnight hover:shadow-md hover:shadow-gold/30'
            }`}
          >
            {isOpen ? 'Close' : '▶ Play'}
          </button>
        </td>
        {user && (
          <td className="py-3 px-3">
            <button
              onClick={() => handleDelete(rec._id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-red-300 border border-red-400/30 hover:bg-red-500/10 transition-colors"
            >
              Delete
            </button>
          </td>
        )}
      </tr>

      {/* Expanded row: audio player + notes */}
      {isOpen && (
        <tr className="bg-midnight/30">
          <td colSpan={user ? 6 : 5} className="p-4">
            <div className="flex flex-col gap-3 fade-in-up">
              <audio
                controls
                className="w-full accent-gold"
                src={getAudioSrc(rec.fileUrl)}
              >
                Your browser does not support audio playback.
              </audio>

              <div>
                <label className="block text-xs font-semibold text-cream/50 uppercase tracking-wider mb-1.5">
                  Notes
                </label>
                <textarea
                  rows={3}
                  disabled={!user}
                  className="w-full bg-midnight/60 border border-violet/30 rounded-lg p-3 text-sm text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-60"
                  defaultValue={rec.notes}
                  placeholder={user ? 'Write notes about this consultation...' : 'Sign in to add notes'}
                  onChange={(e) =>
                    setActiveNotes((prev) => ({ ...prev, [rec._id]: e.target.value }))
                  }
                />
                {user && (
                  <button
                    onClick={() => saveNotes(rec._id)}
                    disabled={savingId === rec._id}
                    className="mt-2 px-5 py-1.5 bg-gold text-midnight rounded-full text-xs font-semibold hover:shadow-md hover:shadow-gold/30 transition-all disabled:opacity-50"
                  >
                    {savingId === rec._id ? 'Saving...' : 'Save Notes'}
                  </button>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
