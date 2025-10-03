"use client";
import React, { useEffect, useRef, useState } from "react";

interface ConclusionCardProps {
  scoreLabel: string;
  finalScore: string;
}

const ConclusionCard: React.FC<ConclusionCardProps> = ({ scoreLabel, finalScore }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative p-8 rounded-3xl bg-gradient-to-br from-cyan-900 via-teal-950 to-cyan-900 shadow-[0_0_40px_rgba(0,255,255,0.3)] overflow-hidden transition-all duration-1000 ease-out 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Borde neón animado */}
      <div className="absolute inset-0 rounded-3xl border-4 border-cyan-400/50 animate-[neonGlow_2s_ease-in-out_infinite] pointer-events-none"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 ">
          Conclusión
        </h2>
        <p className="text-2xl md:text-5xl text-white/80 mb-6">
          Puntaje final: <span className="font-extrabold text-teal-300">{finalScore}%</span>
        </p>

        {/* Línea decorativa tipo neón */}
        <div className="h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 animate-pulse"></div>
      </div>

      <style jsx>{`
        @keyframes neonGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0,255,255,0.7), 0 0 30px rgba(0,255,255,0.5); }
          50% { box-shadow: 0 0 25px rgba(0,255,255,1), 0 0 50px rgba(0,255,255,0.8); }
        }
      `}</style>
    </div>
  );
};

export default ConclusionCard;
