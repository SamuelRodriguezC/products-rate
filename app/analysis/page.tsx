"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import GeneralDataCard from "@/components/Analisys/GeneralDataCard";
import SectionCounters from "@/components/Analisys/SectionCounter";
import SectionCounter from "@/components/Analisys/SectionCounter";
import RadarChart from "@/components/Analisys/RadarChart";
import ConclusionCard from "@/components/Analisys/ConclusionCard";
import ButtonDownload from "@/components/UIComponents/ButtonDownload";

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
      ? "Producto altamente recomendable"
      : Number(finalScore) >= 60
      ? "Producto con potencial"
      : "No recomendable";

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 25;
    const lineHeight = 8;

    // --- Encabezado principal ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("Análisis del producto", pageWidth / 2, y, { align: "center" });
    y += 12;

    // Línea decorativa debajo del título
    doc.setDrawColor(0, 150, 136); // teal/cyan
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    /// --- Imagen del producto ---
    if (data.image) {
      const imgWidth = 70;
      const imgHeight = 70;
      const imgX = margin;
      doc.addImage(data.image, "JPEG", imgX, y, imgWidth, imgHeight);
      y += imgHeight; // solo subimos Y la altura de la imagen, sin +10
    }

    // --- Detalles generales debajo de la imagen ---
    const textGap = 5; // pequeño espacio entre imagen y texto
    y += textGap;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Nombre:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.name}`, margin + 35, y);
    y += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Finalidad:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.purpose}`, margin + 35, y);
    y += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Problema:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.problem}`, margin + 35, y);
    y += lineHeight;

    // --- Targets ---
    doc.setFont("helvetica", "bold");
    doc.text("Público:", margin, y);
    doc.setFont("helvetica", "normal");

    // Ajustamos el texto al ancho disponible
    const targetText = data.targets.join(", ");
    const targetLines = doc.splitTextToSize(
      targetText,
      pageWidth - margin * 2 - 35
    ); // 35 para la indentación
    doc.text(targetLines, margin + 35, y);
    y += targetLines.length * lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Calificación promedio:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.rating}`, margin + 50, y);
    y += lineHeight + 5;

    // --- Función para categorías con promedio ---
    const addCategory = (title: string, answers: SectionAnswers) => {
      // Calcular promedio de la sección
      const values = Object.values(answers).map((a) => a.value);
      const avg = values.length
        ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
        : "0";

      // Título categoría con promedio
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 150, 136);
      doc.text(`${title.toUpperCase()} (Promedio: ${avg}/5)`, margin, y);
      y += lineHeight;

      // Respuestas
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      Object.values(answers).forEach((ans) => {
        const lines = doc.splitTextToSize(
          `• ${ans.text}: ${ans.value}/5`,
          pageWidth - 2 * margin
        );
        doc.text(lines, margin + 5, y);
        y += lines.length * lineHeight;

        if (y > 270) {
          doc.addPage();
          y = 25;
        }
      });

      // Línea separadora después de la categoría
      y += 3;
      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    };

    addCategory("Análisis Visual", data.sections.visual.answers);
    addCategory("Análisis Técnico", data.sections.technical.answers);
    addCategory("Análisis Estratégico", data.sections.strategic.answers);

    // --- Conclusión ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 150, 136);
    doc.text("CONCLUSIÓN", margin, y);
    y += lineHeight;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${scoreLabel}`, margin + 5, y);
    y += lineHeight;
    doc.text(`Puntaje final: ${finalScore}%`, margin + 5, y);

    // Limpiar caracteres que no se pueden usar en un nombre de archivo
    const safeName = data.name.replace(/[^a-z0-9]/gi, "_"); // reemplaza espacios y caracteres especiales
    doc.save(`analisis_${safeName}.pdf`);
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

      <ConclusionCard scoreLabel={scoreLabel} finalScore={finalScore} />

      {/* Botón descargar */}
      <div className="flex justify-end">
        <ButtonDownload onClick={handleDownloadPDF} text="Descargar PDF" />
      </div>
    </div>
  );
};

export default AnalysisPage;
