import React from "react";

type TextareaProps = {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  name,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none ${className}`}
    />
  );
};

export default Textarea;
