import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState('');
  const [audio, setAudio] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!audio) {
      setError('Please select an audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('clientName', clientName);
    formData.append('notes', notes);
    formData.append('audio', audio);

    try {
      setSubmitting(true);
      await api.post('/recordings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to upload recording.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fade-in-up max-w-lg mx-auto">
      <div className="mb-8 text-center">
        <p className="text-gold-soft/70 uppercase tracking-[0.25em] text-xs mb-1">
          New Session
        </p>
        <h2 className="font-display text-4xl text-cream">Upload Recording</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-midnight-light/60 border border-violet/20 rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      >
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-cream/80 mb-1.5">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Career Consultation - June Session"
            className="w-full bg-midnight/60 border border-violet/30 rounded-lg px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cream/80 mb-1.5">Client Name</label>
          <input
            type="text"
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Rohit Sharma"
            className="w-full bg-midnight/60 border border-violet/30 rounded-lg px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cream/80 mb-1.5">Notes (optional)</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any initial notes about this consultation..."
            className="w-full bg-midnight/60 border border-violet/30 rounded-lg px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cream/80 mb-1.5">Audio File</label>
          <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-violet/30 rounded-lg px-4 py-6 text-cream/50 hover:border-gold/40 hover:text-gold-soft transition-all cursor-pointer">
            <span>{audio ? `🎙️ ${audio.name}` : '🎙️ Choose an audio file...'}</span>
            <input
              type="file"
              accept="audio/*"
              required
              onChange={(e) => setAudio(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 px-4 py-2.5 bg-gradient-to-r from-gold to-gold-soft text-midnight rounded-full font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
        >
          {submitting ? 'Uploading...' : 'Upload Recording'}
        </button>
      </form>
    </div>
  );
}
