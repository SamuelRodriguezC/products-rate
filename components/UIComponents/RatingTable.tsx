"use client";
import React from "react";

interface RatingTableProps {
  title: string;
}

const questions = [
  "Generalización del problema",
  "Probabilidad de Brandear (Crear Marca)",
  "Grado de satisfacción del problema",
  "Efecto Wow",
  "Existen productos relacionados",
  "Tamaño adecuado (Pequeño o Mediano)",
  "Facil uso e instalación ",
  "Me apasiona el Nicho",
  "Grado de recurrencia (Se puede comprar más de una vez)",
];

const RatingTable: React.FC<RatingTableProps> = ({ title }) => {
  return (
    <div className="overflow-x-auto p-4">
      {/* Título pasado por prop */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center">
        {title}
      </h3>

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400 text-sm uppercase tracking-wider">
            <th className="text-left py-3 px-4">Pregunta</th>
            {[1, 2, 3, 4, 5].map((num) => (
              <th key={num} className="py-3 px-4">
                {num}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((q, qi) => (
            <tr
              key={qi}
              className="bg-gray-900 hover:bg-cyan-900 transition-colors"
            >
              {/* Pregunta */}
              <td className="py-3 px-4 text-left text-gray-200 text-sm font-medium">
                {q}
              </td>

              {/* Radios */}
              {[1, 2, 3, 4, 5].map((num) => (
                <td key={num} className="py-3 px-4">
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      name={`q${qi}`}
                      value={num}
                      className="w-4 h-4 accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingTable;
