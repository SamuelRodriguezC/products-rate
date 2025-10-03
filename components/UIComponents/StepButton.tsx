import React from 'react';

// Definimos props
interface BackButtonProps {
  onClick: () => void;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => {
  return (
    <div>
      <button
        className="bg-gradient-to-r from-cyan-900/60 via-cyan-900/60 to-teal-900/60  text-center w-48 rounded-2xl h-12 text-white text-xl font-semibold group ml-auto border-2 border-cyan-400/50 hover:bg-cyan-500/50 transition-all duration-200 cursor-pointer"
        type="button"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default BackButton;
