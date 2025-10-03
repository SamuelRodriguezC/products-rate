"use client";

import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import CategoryFeedback from "./CategoryFeedback";

interface SectionCounterProps {
  title: string;
  value: number;
}

const SectionCounter: React.FC<SectionCounterProps> = ({ title, value }) => {
  return (
    <motion.div
      className="card-container p-4 text-center bg-gray-800 rounded-lg"
      initial={{ opacity: 0, x: -50 }}   // empieza invisible y a la izquierda
      animate={{ opacity: 1, x: 0 }}      // termina visible en posición normal
      transition={{ duration: 0.8, ease: "easeOut" }} // duración y suavidad
    >
      <h2 className="font-bold text-white text-xl">{title}</h2>
      <p className="text-lg">
        <CountUp
          className="text-3xl xl:text-5xl font-extrabold bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent"
          end={value}
          duration={2}
          decimals={1}
          start={0}
        />
        /5
      </p>
        <CategoryFeedback category="Visual" score={value} />
    </motion.div>
  );
};

export default SectionCounter;
