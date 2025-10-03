"use client";
import React from "react";
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
    <div className="card-container p-4 mt-4">
      <h2 className="text-lg font-bold mb-2 text-white">
        📈 Radar de secciones
      </h2>
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
    </div>
  );
};

export default RadarChart;
