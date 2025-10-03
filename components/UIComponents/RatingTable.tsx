"use client";
import React from "react";

interface RatingTableProps {
  title: string;
  questions: { id: string; text: string }[];
  answers: { [key: string]: { text: string; value: number } };
  onChange: (key: string, value: number, questionText: string) => void;
}

const RatingTable: React.FC<RatingTableProps> = ({ title, questions, answers, onChange }) => {
  return (
    <div className="overflow-x-auto p-4">
      <h3 className="text-3xl font-bold text-white mb-4 text-center uppercase">
        {title}
      </h3>

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400 text-sm uppercase tracking-wider">
            <th className="text-left py-3 px-4">Pregunta</th>
            {[1, 2, 3, 4, 5].map((num) => (
              <th key={num} className="py-3 px-4">{num}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map(({ id, text }) => (
            <tr key={id} className="bg-gray-900 hover:bg-cyan-900 transition-colors">
              <td className="py-3 px-4 text-left text-gray-200 text-sm font-medium">
                {text}
              </td>
              {[1, 2, 3, 4, 5].map((num) => (
                <td key={num} className="py-3 px-4">
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      name={`${title}-${id}`}
                      value={num}
                      checked={answers[id]?.value === num}
                      onChange={() => onChange(id, num, text)}
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
