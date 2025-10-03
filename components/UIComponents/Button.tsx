import React from 'react';

// Definimos las props que recibirá el botón
interface ButtonProps {
  type: "button" | "submit" | "reset"; // Limitamos los tipos válidos
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button
      type={type}
      className="ml-auto px-8 py-1 rounded-xl font-semibold text-lg 
                 bg-gradient-to-r from-cyan-900/60 via-cyan-900/60 to-teal-900/60 
                 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 
                 transition-all duration-300 group group-hover:before:duration-500 
                 group-hover:after:duration-500 after:duration-500 border-cyan-400/50 
                 hover:before:[box-shadow:_20px_20px_20px_30px_#007CC9] 
                 before:duration-500 hover:duration-500
                 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 
                 hover:before:blur  origin-left 
                 hover:decoration-2 hover:text-cyan-300 relative bg-gray-800 h-12 
                 w-64 border-2 text-left p-1
                 overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] 
                 before:right-1 before:top-1 before:z-10 before:bg-teal-500 before:rounded-full
                  before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content[''] 
                   after:bg-cyan-500 after:right-8 after:top-3 after:rounded-full after:blur-lg cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;
