"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
  visualAvg: number;
  techAvg: number;
  stratAvg: number;
}

const RadarChart: React.FC<RadarChartProps> = ({
  visualAvg,
  techAvg,
  stratAvg,
}) => {
  const radarData = [
    { subject: "Visual", A: visualAvg, fullMark: 5 },
    { subject: "Técnico", A: techAvg, fullMark: 5 },
    { subject: "Estratégico", A: stratAvg, fullMark: 5 },
  ];

  return (
    <motion.div
      className="card-container p-4 mt-4 bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-lg font-bold mb-2 text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        📈 Radar de secciones
      </motion.h2>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" stroke="#38bdf8" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar
              name="Puntaje"
              dataKey="A"
              stroke="#38bdf8"
              fill="#38bdf8"
              fillOpacity={0.6}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default RadarChart;
