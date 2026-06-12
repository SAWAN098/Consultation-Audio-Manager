import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Starfield from '../components/Starfield';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Starfield />
      <div className="w-full max-w-md fade-in-up">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl text-gold-soft tracking-wide">
            ✦ Consultation Audio Manager
          </Link>
          <p className="text-cream/60 mt-2 text-sm">Create an account to begin recording consultations</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-midnight-light/60 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 shadow-2xl shadow-violet/10"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-cream/80 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pandit Ramesh Sharma"
              className="w-full bg-midnight/60 border border-violet/30 rounded-lg px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-cream/80 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-midnight/60 border border-violet/30 rounded-lg px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-cream/80 mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-midnight/60 border border-violet/30 rounded-lg px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gold to-gold-soft text-midnight font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-cream/50 text-sm mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-soft hover:text-gold transition-colors">
              Sign in
            </Link>
          </p>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="text-cream/40 hover:text-cream/70 text-sm transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
