"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import GeneralDataCard from "@/components/Analisys/GeneralDataCard";
import SectionCounters from "@/components/Analisys/SectionCounter";
import SectionCounter from "@/components/Analisys/SectionCounter";
import RadarChart from "@/components/Analisys/RadarChart";

interface SectionAnswers {
  [key: string]: {
    text: string;
    value: number;
  };
}

interface FormData {
  name: string;
  purpose: string;
  problem: string;
  rating: number;
  targets: string[];
  image?: string;
  sections: {
    visual: { title: string; answers: SectionAnswers };
    technical: { title: string; answers: SectionAnswers };
    strategic: { title: string; answers: SectionAnswers };
  };
}

const AnalysisPage: React.FC = () => {
  const [data, setData] = useState<FormData | null>(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("analysisData");
    if (savedData) {
      setData(JSON.parse(savedData) as FormData);
    }
  }, []);

  if (!data) {
    return <p className="text-white">⚠️ No hay datos enviados.</p>;
  }

  // Calcular promedios por sección
  const calcAverage = (answers: SectionAnswers) => {
    const values = Object.values(answers).map((a) => a.value);
    if (!values.length) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const visualAvg = calcAverage(data.sections.visual.answers);
  const techAvg = calcAverage(data.sections.technical.answers);
  const stratAvg = calcAverage(data.sections.strategic.answers);

  // Puntaje final en porcentaje
  const rawScore = (visualAvg + techAvg + stratAvg) / 3; // de 0 a 5
  const finalScore = ((rawScore / 5) * 100).toFixed(1); // en porcentaje

  const scoreLabel =
    Number(finalScore) >= 80
      ? "🟢 Producto altamente recomendable"
      : Number(finalScore) >= 60
      ? "🟡 Producto con potencial"
      : "🔴 No recomendable";

  // Generar PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("📊 Análisis del producto", 10, 20);

    // Datos generales
    doc.setFontSize(12);
    doc.text(`Nombre: ${data.name}`, 10, 40);
    doc.text(`Finalidad: ${data.purpose}`, 10, 50);
    doc.text(`Problema que resuelve: ${data.problem}`, 10, 60);
    doc.text(`Targets: ${data.targets.join(", ")}`, 10, 70);
    doc.text(`Calificación promedio: ${data.rating}`, 10, 80);

    // Promedios por sección
    doc.text("Promedios por sección:", 10, 100);
    doc.text(`Visual: ${visualAvg.toFixed(1)}/5`, 20, 110);
    doc.text(`Técnico: ${techAvg.toFixed(1)}/5`, 20, 120);
    doc.text(`Estratégico: ${stratAvg.toFixed(1)}/5`, 20, 130);

    let y = 150;
    const lineHeight = 8;

    // Función auxiliar para listar respuestas
    const addSectionDetails = (title: string, answers: SectionAnswers) => {
      doc.setFontSize(13);
      doc.text(title, 10, y);
      y += lineHeight;

      doc.setFontSize(11);
      Object.values(answers).forEach((ans) => {
        const splitted = doc.splitTextToSize(
          `${ans.text}: ${ans.value}/5`,
          180
        );
        doc.text(splitted, 15, y);
        y += splitted.length * lineHeight;

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      y += lineHeight;
    };

    // Rankings detallados
    addSectionDetails("📌 Detalle de Visual", data.sections.visual.answers);
    addSectionDetails("📌 Detalle Técnico", data.sections.technical.answers);
    addSectionDetails(
      "📌 Detalle Estratégico",
      data.sections.strategic.answers
    );

    // Conclusión
    doc.setFontSize(13);
    doc.text("Conclusión:", 10, y);
    y += lineHeight;
    doc.setFontSize(11);
    doc.text(`${scoreLabel}`, 20, y);
    y += lineHeight;
    doc.text(`Puntaje final: ${finalScore}%`, 20, y);

    doc.save("analisis_producto.pdf");
  };

  // Datos radar chart
  const radarData = [
    { subject: "Visual", A: visualAvg, fullMark: 5 },
    { subject: "Técnico", A: techAvg, fullMark: 5 },
    { subject: "Estratégico", A: stratAvg, fullMark: 5 },
  ];

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900  flex flex-col gap-6">
      <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Análisis de
        </span>{" "}
        Tu Producto.
      </h1>

      {/* Contenedor principal: Card izquierda, contadores derecha */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Card izquierda */}
        <div className="md:w-1/2">
          <GeneralDataCard
            name={data.name}
            purpose={data.purpose}
            problem={data.problem}
            targets={data.targets}
            rating={data.rating}
            image={data.image}
          />
        </div>

        {/* Contadores derecha */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <SectionCounter title="Visual" value={visualAvg} />
            <SectionCounter title="Técnico" value={techAvg} />
            <SectionCounter title="Estratégico" value={stratAvg} />
          </div>

          {/* Radar Chart debajo de los contadores */}
          <RadarChart
              visualAvg={visualAvg}
              techAvg={techAvg}
              stratAvg={stratAvg}
            />

        </div>
      </div>

      {/* Conclusión */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 card-container">
        <h2 className="text-lg font-bold text-cyan-400 mb-2">📌 Conclusión</h2>
        <p className="text-xl">{scoreLabel}</p>
        <p className="mt-2 text-gray-300">
          Puntaje final: <span className="font-bold">{finalScore}%</span>
        </p>
      </div>

      {/* Botón descargar */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          📥 Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;
