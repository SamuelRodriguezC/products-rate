import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string; // <-- nueva prop opcional
  error?: string; // <-- Recibe el error opcional
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  label,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        autoComplete="off"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 rounded-lg bg-gray-900 border-2 border-gray-700 
          text-white placeholder-gray-400 
          focus:border-2 focus:border-cyan-500 
          focus:shadow-lg focus:shadow-cyan-500/30 
          outline-none transition duration-500 ${className}`}
        {...props}
      />
            {/* Mensaje de error */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
