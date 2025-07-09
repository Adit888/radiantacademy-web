import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#0a0a0a] text-white shadow-lg border-b border-[#ff4654] border-opacity-40">
      {/* Top red accent line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#ff4654] via-[#bd3944] to-[#ff4654]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <h1 className="text-2xl font-extrabold tracking-wider uppercase">
            Radiant<span className="text-[#ff4654]">Academy</span>
          </h1>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/guides', label: 'Guides' },
              { to: '/agents', label: 'Agents' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group px-3 py-2 font-medium text-white hover:text-[#ff4654] transition-all duration-300"
              >
                <span>{item.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4654] group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}

            {/* Login or Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#ff4654] hover:bg-[#bd3944] text-white px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
