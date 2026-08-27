import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-amber-gold to-amber-light rounded-lg group-hover:shadow-[0_0_15px_rgba(245,166,35,0.5)] transition-all duration-300">
                <FiGithub className="text-gray-900 text-xl" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-gold to-amber-light">Pulse</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="https://github.com/ayush-3945/DevPulse" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-amber-gold px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
