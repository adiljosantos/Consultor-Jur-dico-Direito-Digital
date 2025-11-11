
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 text-center sticky top-0 z-10">
      <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
        Consultor Jurídico Digital
      </h1>
      <p className="text-sm text-gray-400">Potencializado por Gemini</p>
    </header>
  );
};

export default Header;
