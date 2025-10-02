"use client";
import React, { useState } from "react";
import FileInput from "./UIComponents/FileInput";
import TextInput from "./UIComponents/TextInput";
import StarRating from "./UIComponents/StarRating";
import TargetSelect from "./UIComponents/TargetSelect";
import RatingTable from "./UIComponents/RatingTable";

const VisualQuestions = {
  q1: "Generalización del problema",
  q2: "Probabilidad de Brandear (Crear Marca)",
  q3: "Grado de satisfacción del problema",
  q4: "Efecto Wow",
  q5: "Existen productos relacionados",
  q6: "Tamaño adecuado (Pequeño o Mediano)",
  q7: "Facil uso e instalación",
  q8: "Me apasiona el Nicho",
  q9: "Grado de recurrencia (Se puede comprar más de una vez)",
};

const TechnicalQuestions = {
  m1: "Dificultad de encontrar en mercado físico",
  m2: "Actualizado (En su última versión)",
  m3: "Se vende en tiendas online de otros paises ",
  m4: "Valoración de clientes",
};

const ProductForm = () => {
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
    },
  });

  const [submittedData, setSubmittedData] = useState<any>(null);

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
    section: "visual" | "technical",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    setSubmittedData(formData);
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
          onChange={(key, value) =>
            handleRankingChange("visual", key, value, VisualQuestions[key as keyof typeof VisualQuestions])
          }
        />

        <RatingTable
          title={formData.sections.technical.title}
          questions={TechnicalQuestions}
          answers={formData.sections.technical.answers}
          onChange={(key, value) =>
            handleRankingChange("technical", key, value, TechnicalQuestions[key as keyof typeof TechnicalQuestions])
          }
        />
      </div>

      <div className="flex justify-between mt-8">
        <button type="submit" className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
          Finalizar
        </button>
      </div>

      {submittedData && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-left text-white">
          <h3 className="font-bold text-cyan-400 mb-2">📦 Datos enviados:</h3>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
};

export default ProductForm;
