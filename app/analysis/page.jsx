"use client";
import React, { useEffect, useState } from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

const AnalysisPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("analysisData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) {
    return <p className="text-white">⚠️ No hay datos enviados.</p>;
  }

  // Calcular promedios por sección
  const calcAverage = (answers) => {
    const values = Object.values(answers).map((a) => a.value);
    if (!values.length) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const visualAvg = calcAverage(data.sections.visual.answers);
  const techAvg = calcAverage(data.sections.technical.answers);
  const stratAvg = calcAverage(data.sections.strategic.answers);

  // Score final
  const finalScore = ((visualAvg + techAvg + stratAvg) / 3).toFixed(1);

  const scoreLabel =
    finalScore >= 4
      ? "🟢 Producto altamente recomendable"
      : finalScore >= 3
      ? "🟡 Producto con potencial"
      : "🔴 No recomendable";

  // Datos para radar chart
  const radarData = [
    { subject: "Visual", A: visualAvg, fullMark: 5 },
    { subject: "Técnico", A: techAvg, fullMark: 5 },
    { subject: "Estratégico", A: stratAvg, fullMark: 5 },
  ];

  return (
    <div className="p-8 text-white">
      {/* Resumen */}
      <h1 className="text-2xl font-bold text-cyan-400 mb-4">📊 Análisis del producto</h1>
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <p><strong>Nombre:</strong> {data.name}</p>
        <p><strong>Finalidad:</strong> {data.purpose}</p>
        <p><strong>Problema que resuelve:</strong> {data.problem}</p>
        <p><strong>Targets:</strong> {data.targets.join(", ")}</p>
        <p><strong>Calificación promedio:</strong> ⭐ {data.rating}</p>
      </div>

      {/* Promedios por sección */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="font-bold text-cyan-300">Visual</h2>
          <p className="text-lg">{visualAvg.toFixed(1)}/5</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="font-bold text-cyan-300">Técnico</h2>
          <p className="text-lg">{techAvg.toFixed(1)}/5</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="font-bold text-cyan-300">Estratégico</h2>
          <p className="text-lg">{stratAvg.toFixed(1)}/5</p>
        </div>
      </div>

      {/* Gráfico radar */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold mb-2 text-cyan-400">📈 Radar de secciones</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
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
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Conclusión */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-cyan-400 mb-2">📌 Conclusión</h2>
        <p className="text-xl">{scoreLabel}</p>
        <p className="mt-2 text-gray-300">
          Puntaje final: <span className="font-bold">{finalScore}/5</span>
        </p>
      </div>
    </div>
  );
};

export default AnalysisPage;
