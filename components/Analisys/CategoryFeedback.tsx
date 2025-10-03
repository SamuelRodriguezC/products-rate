"use client";
import React from "react";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface CategoryFeedbackProps {
  category: "Visual" | "Técnico" | "Estratégico";
  score: number; // de 0 a 5
}

const CategoryFeedback: React.FC<CategoryFeedbackProps> = ({ category, score }) => {
  let icon = <Circle className="inline w-5 h-5 text-gray-400" />;
  let text = "";

  if (score >= 4.5) {
    icon = <CheckCircle className="inline w-5 h-5 text-green-500" />;
    text = "Excelente";
  } else if (score >= 4) {
    icon = <CheckCircle className="inline w-5 h-5 text-green-400" />;
    text = "Muy bueno";
  } else if (score >= 3.5) {
    icon = <Circle className="inline w-5 h-5 text-yellow-400" />;
    text = "Bueno";
  } else if (score >= 3) {
    icon = <Circle className="inline w-5 h-5 text-yellow-500" />;
    text = "Aceptable";
  } else if (score >= 2) {
    icon = <AlertCircle className="inline w-5 h-5 text-red-400" />;
    text = "Débil";
  } else {
    icon = <AlertCircle className="inline w-5 h-5 text-red-600" />;
    text = "Muy débil";
  }

  return (
    <div className="mt-2 flex justify-center items-center">
      <p className="flex items-center gap-2">
        {icon} {text}
      </p>
    </div>
  );
};

export default CategoryFeedback;
