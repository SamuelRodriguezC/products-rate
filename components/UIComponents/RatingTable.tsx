"use client";
import React from "react";

const questions = [
  "¿Qué tan satisfecho estás con el servicio?",
  "¿Qué tan fácil fue el proceso?",
  "¿Recomendarías este producto?",
  "¿El producto cumplió tus expectativas?",
  "¿Qué tan clara fue la información proporcionada?",
  "¿Qué tan rápido recibiste la atención?",
  "¿Qué tan útil fue el soporte recibido?",
  "¿Cómo calificas la relación calidad-precio?",
  "¿Qué tan confiable consideras la empresa?",
  "¿Volverías a comprar con nosotros?",
];

const RatingTable: React.FC = () => {
  return (
    <div className="overflow-x-auto p-4">
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
