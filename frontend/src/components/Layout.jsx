import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Starfield from './Starfield';

const linkClasses = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-gold text-midnight shadow-md shadow-gold/20'
      : 'text-cream/70 hover:text-gold-soft hover:bg-midnight-light'
  }`;

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield count={50} />

      {/* Top nav */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-midnight/70 border-b border-violet/20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <Link to="/" className="font-display text-2xl text-gold-soft tracking-wide whitespace-nowrap">
            ✦ Consultation Audio Manager
          </Link>

          <nav className="flex items-center gap-2 flex-wrap">
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
            {user && (
              <NavLink to="/upload" className={linkClasses}>
                Upload Recording
              </NavLink>
            )}

            {user ? (
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-violet/30">
                <span className="text-cream/50 text-sm hidden sm:inline">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-cream/70 border border-violet/30 hover:border-red-400/50 hover:text-red-300 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-gold text-midnight hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
