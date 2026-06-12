import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Starfield from '../components/Starfield';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield count={90} />

      {/* Nav */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <span className="font-display text-2xl text-gold-soft tracking-wide">
          ✦ Consultation Audio Manager
        </span>
        <nav className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-full bg-gold text-midnight font-semibold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border border-gold/40 text-cream text-sm hover:border-gold hover:text-gold-soft transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-gold text-midnight font-semibold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-3xl text-center fade-in-up">
          <p className="text-gold-soft/80 uppercase tracking-[0.3em] text-xs mb-4">
            For astrologers & consultants
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">
            Every reading,
            <br />
            <span className="shimmer-text">remembered.</span>
          </h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto mb-10">
            Record your consultations, keep notes on each client's chart, and
            track which sessions still need review — all in one quiet, organized place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/upload"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-gold-soft text-midnight font-semibold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 active:scale-95"
              >
                Upload a Recording
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-gold-soft text-midnight font-semibold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 active:scale-95"
              >
                Create Free Account
              </Link>
            )}
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-full border border-violet/40 text-cream hover:border-gold/50 hover:text-gold-soft transition-all duration-300"
            >
              Browse Recordings
            </Link>
          </div>

          {/* Feature trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
            <Feature
              icon="🎙️"
              title="Upload & Tag"
              text="Attach client name and title to every audio consultation as you save it."
            />
            <Feature
              icon="🔍"
              title="Search Instantly"
              text="Find any past session by client name or title in a moment."
            />
            <Feature
              icon="🌙"
              title="Track Status"
              text="Move recordings through Pending, Reviewed, and Completed phases."
            />
          </div>
        </div>
      </main>

      <footer className="text-center text-cream/30 text-xs py-6">
        Crafted for quiet, focused consultation work.
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-midnight-light/50 border border-violet/20 rounded-2xl p-6 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-display text-xl text-gold-soft mb-1">{title}</h3>
      <p className="text-cream/50 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
