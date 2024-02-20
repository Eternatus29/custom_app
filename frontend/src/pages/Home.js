import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login after sign out for immediate feedback
  };

  const navigationLinks = isLoggedIn ? [
    { name: 'Call Records', path: '/call-record-management' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Send Mail', path: '/contact' },
    { name: 'Sign Out', action: handleSignOut },
  ] : [
    { name: 'Sign Up', path: '/register' },
    { name: 'Sign In', path: '/login' },
  ];

  return (
    <div className="flex flex-col h-screen text-white bg-dark-blue">
      {/* Sidebar */}
      <div className="w-60 h-full shadow-md bg-white/30 backdrop-blur-lg px-1 fixed">
        <ul className="relative">
          {navigationLinks.map((link, index) => (
            <li key={index} className="relative">
              {link.path ? (
                <Link to={link.path} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white hover:bg-white/10 text-ellipsis whitespace-nowrap rounded">
                  {link.name}
                </Link>
              ) : (
                <button onClick={link.action} className="flex items-center text-sm py-4 px-6 h-12 w-full text-left text-white hover:bg-white/10">
                  {link.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-3">
        <div className="mt-12 text-center">
          <h1 className="text-2xl font-bold">Welcome to the home page!</h1>
          <p className="mt-4">
            Content will be added as per requirements.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-dark-blue/80 text-white text-center">
        &copy; Custom App 2024
      </footer>
    </div>
  );
}

export default HomePage;
