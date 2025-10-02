"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileInput from "./UIComponents/FileInput";
import TextInput from "./UIComponents/TextInput";
import StarRating from "./UIComponents/StarRating";
import TargetSelect from "./UIComponents/TargetSelect";
import RatingTable from "./UIComponents/RatingTable";

// Preguntas de cada sección
const VisualQuestions = [
  { id: "v1", text: "Generalización del problema" },
  { id: "v2", text: "Probabilidad de Brandear (Crear Marca)" },
  { id: "v3", text: "Grado de satisfacción del problema" },
  { id: "v4", text: "Efecto Wow" },
  { id: "v5", text: "Existen productos relacionados" },
  { id: "v6", text: "Tamaño adecuado (Pequeño o Mediano)" },
  { id: "v7", text: "Fácil uso e instalación" },
  { id: "v8", text: "Me apasiona el Nicho" },
];

const TechnicalQuestions = [
  { id: "t1", text: "Dificultad de encontrar en mercado físico" },
  { id: "t2", text: "Actualizado (En su última versión)" },
  { id: "t3", text: "Se vende en tiendas online de otros países" },
  { id: "t4", text: "Valoración de clientes (Amazon, Aliexpress ...)" },
  { id: "t5", text: "Cambio alcanzable luego de usar el producto (No es cambio exagerado)" },
  { id: "t6", text: "Competencia del mercado (1 mucha, 5 poca)" },
];

const StrategicQuestions = [
  { id: "s1", text: "Se puede vender en bundle, es low ticket"},
  { id: "s2", text: "Costo de adquisición bajo (5 - 20 mil COP)"},
  { id: "s3", text: "Se puede aplicar un angulo de venta diferente a la competencia" },
  { id: "s4", text: "Público amplio" },
  { id: "s5", text: "Percepción de valor alta" },
  { id: "s6", text: "Grado de recurrencia (Se puede comprar más de una vez)" },
  { id: "s7", text: "Saturación (1 Mucha, 5 Poca)" },
];

const ProductForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    problem: "",
    rating: 0,
    targets: [] as string[],
    sections: {
      visual: {
        title: "Calificación de criterios",
        answers: {} as { [key: string]: { text: string; value: number } },
      },
      technical: {
        title: "Análisis Técnico",
        answers: {} as { [key: string]: { text: string; value: number } },
      },
      strategic: {
        title: "Análisis Estratégico",
        answers: {} as { [key: string]: { text: string; value: number } },
      }
    },
  });

  // Manejo de cambios
  const handleRatingChange = (value: number) => {
    setFormData({ ...formData, rating: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRankingChange = (
    section: "visual" | "technical" | "strategic",
    key: string,
    value: number,
    questionText: string
  ) => {
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        [section]: {
          ...formData.sections[section],
          answers: {
            ...formData.sections[section].answers,
            [key]: { text: questionText, value },
          },
        },
      },
    });
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar en sessionStorage
    sessionStorage.setItem("analysisData", JSON.stringify(formData));

    // Redirigir a la página de análisis
    router.push("/analysis");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-950/70 rounded-2xl p-8">
      {/* Datos básicos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-2 flex h-full"><FileInput /></div>
        <div className="col-span-2 flex flex-col gap-4">
          <TextInput name="name" type="text" label="Nombre" value={formData.name} onChange={handleChange} />
          <TextInput name="purpose" type="text" label="Finalidad" value={formData.purpose} onChange={handleChange} />
          <TextInput name="problem" type="text" label="Problema" value={formData.problem} onChange={handleChange} />
          <TargetSelect value={formData.targets} onChange={(val: string[]) => setFormData({ ...formData, targets: val })} />
          <StarRating label="Calificación promedio" name="rating" value={formData.rating} onChange={handleRatingChange} />
        </div>
      </div>

      {/* Tablas reutilizables */}
      <div className="space-y-6 mt-6">
        <RatingTable
          title={formData.sections.visual.title}
          questions={VisualQuestions}
          answers={formData.sections.visual.answers}
          onChange={(key, value, text) => handleRankingChange("visual", key, value, text)}
        />

        <RatingTable
          title={formData.sections.technical.title}
          questions={TechnicalQuestions}
          answers={formData.sections.technical.answers}
          onChange={(key, value, text) => handleRankingChange("technical", key, value, text)}
        />

        <RatingTable
          title={formData.sections.strategic.title}
          questions={StrategicQuestions}
          answers={formData.sections.strategic.answers}
          onChange={(key, value, text) => handleRankingChange("strategic", key, value, text)}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button type="submit" className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
          Finalizar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
