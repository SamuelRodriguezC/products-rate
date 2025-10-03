"use client";
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  return (
    <div className="mb-8">
      {/* Círculos de los pasos */}
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center w-1/4">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                i + 1 <= step ? "bg-cyan-500" : "bg-gray-700"
              }`}
              animate={{ scale: i + 1 === step ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {i + 1}
            </motion.div>
            <span className="text-xs mt-1 text-gray-300">Paso {i + 1}</span>
          </div>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
