"use client";
import React from "react";

interface GeneralDataCardProps {
  name: string;
  purpose: string;
  problem: string;
  targets: string[];
  rating: number;
  image?: string;
}

const GeneralDataCard: React.FC<GeneralDataCardProps> = ({
  name,
  purpose,
  problem,
  targets,
  rating,
  image,
}) => {
  return (
    <div className="card-container flex flex-col md:flex-row gap-6  p-6 justify-center items-center">
      {/* Columna de la imagen */}
      {image && (
        <div className="flex-shrink-0 flex flex-col items-center container-gradient">
          <p className="font-bold mb-2 text-center">{name}</p>
          <img
            src={image}
            alt="Imagen del producto"
            className="w-full max-w-xs h-auto rounded-lg object-cover"
          />
        </div>
      )}

      {/* Columna de la información */}
      <div className="flex-1 text-white flex flex-col justify-center md:items-start text-center md:text-left">
        <div className="mb-4">
          <p className="font-semibold">Finalidad:</p>
          <p className="ml-2">{purpose}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Problema que resuelve:</p>
          <p className="ml-2">{problem}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Targets:</p>
          <p className="ml-2">{targets.join(", ")}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Calificación promedio:</p>
          <div className="ml-2 flex items-center">
            {Array.from({ length: rating }, (_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDataCard;
