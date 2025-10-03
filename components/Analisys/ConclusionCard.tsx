"use client";
import React from "react";

interface ConclusionCardProps {
  scoreLabel: string;
  finalScore: string;
}

const ConclusionCard: React.FC<ConclusionCardProps> = ({ scoreLabel, finalScore }) => {
  return (
    <div className="card-container p-6 rounded-xl shadow-2xl border border-white/20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 text-center">
        📌 Conclusión
      </h2>

      <p className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
        {scoreLabel}
      </p>

      <p className="text-xl md:text-2xl text-white/90 text-center">
        Puntaje final:{" "}
        <span className="font-extrabold text-white">{finalScore}%</span>
      </p>

      {/* Línea decorativa */}
      <div className="h-1 w-24 bg-white/50 rounded-full mx-auto mt-4 animate-pulse"></div>
    </div>
  );
};

export default ConclusionCard;
