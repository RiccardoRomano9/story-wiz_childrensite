import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-purple-600 transition-transform hover:scale-105"
        >
          <BookOpen size={32} className="text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            StoryWiz
          </span>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/create" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
              >
                Crea Storia
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;