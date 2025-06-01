import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-gray-600 gap-1">
          Creato con <Heart size={16} className="text-red-500 fill-red-500" /> per bambini creativi
        </p>
        <p className="text-sm text-gray-500 mt-1">
          StoryWiz usa l'IA per aiutare i bambini a creare storie fantastiche
        </p>
      </div>
    </footer>
  );
};

export default Footer;