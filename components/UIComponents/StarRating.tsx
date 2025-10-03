import React, { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  label?: string;
  name: string;
  value?: number;
  error?: string; // <-- Recibe el error opcional
  onChange?: (value: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ label, name, value = 0, onChange, error}) => {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(value);

  const handleClick = (val: number) => {
    setRating(val);
    onChange?.(val);
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}

      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
          >
            <Star
              className={`w-7 h-7 transition-colors ${
                (hover ?? rating) >= star ? "text-cyan-400 fill-cyan-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
            {/* Mensaje de error */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* input oculto para formularios */}
      <input type="hidden" name={name} value={rating} />
    </div>
  );
};

export default StarRating;
