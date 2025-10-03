"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FileInput from "./UIComponents/FileInput";
import TextInput from "./UIComponents/TextInput";
import StarRating from "./UIComponents/StarRating";
import TargetSelect from "./UIComponents/TargetSelect";
import RatingTable from "./UIComponents/RatingTable";

// Interfaces
interface Answer {
  text: string;
  value: number;
}
interface Section {
  title: string;
  answers: { [key: string]: Answer };
}
interface FormData {
  name: string;
  purpose: string;
  problem: string;
  rating: number;
  image: string | null;
  targets: string[];
  sections: {
    visual: Section;
    technical: Section;
    strategic: Section;
  };
}

// Preguntas
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
  { id: "t5", text: "Cambio alcanzable luego de usar el producto" },
  { id: "t6", text: "Competencia del mercado (1 mucha, 5 poca)" },
];
const StrategicQuestions = [
  { id: "s1", text: "Se puede vender en bundle, es low ticket" },
  { id: "s2", text: "Costo de adquisición bajo (5 - 20 mil COP)" },
  { id: "s3", text: "Se puede aplicar un angulo de venta diferente" },
  { id: "s4", text: "Público amplio" },
  { id: "s5", text: "Percepción de valor alta" },
  { id: "s6", text: "Grado de recurrencia (Se puede comprar más de una vez)" },
  { id: "s7", text: "Saturación (1 Mucha, 5 Poca)" },
];

const ProductForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    purpose: "",
    problem: "",
    rating: 0,
    image: null,
    targets: [],
    sections: {
      visual: { title: "Calificación de criterios", answers: {} },
      technical: { title: "Análisis Técnico", answers: {} },
      strategic: { title: "Análisis Estratégico", answers: {} },
    },
  });

  // Handlers
  const handleRatingChange = (value: number) => setFormData({ ...formData, rating: value });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRankingChange = (section: "visual" | "technical" | "strategic", key: string, value: number, questionText: string) => {
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        [section]: {
          ...formData.sections[section],
          answers: { ...formData.sections[section].answers, [key]: { text: questionText, value } },
        },
      },
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("analysisData", JSON.stringify(formData));
    router.push("/analysis");
  };

  return (
    <>
    <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="
      relative 
      border-2 border-cyan-400/50
      p-[17px]   /* espacio para que se vea el borde */
      rounded-3xl 
      bg-gradient-to-r from-cyan-400/60 via-blue-500/60 to-teal-600/60 
      shadow-[0_0_100px_10px_rgba(34,211,238,0.4)]
    "
  >
  <motion.form
    onSubmit={handleSubmit}
    className="
      bg-gray-900   /* ← aquí ya queda gris sin degradado */
      backdrop-blur-xl 
      rounded-3xl 
      p-10
      w-full 
      h-full
    "
  >
      {/* Datos básicos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          className="col-span-2 flex h-full"
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FileInput onFileSelect={(img) => setFormData({ ...formData, image: img })} />
        </motion.div>

        <div className="col-span-2 flex flex-col gap-5">
          <TextInput name="name" type="text" label="Nombre del producto" value={formData.name} onChange={handleChange} />
          <TextInput name="purpose" type="text" label="¿Para qué sirve?" value={formData.purpose} onChange={handleChange} />
          <TextInput name="problem" type="text" label="¿Qué problema resuelve?" value={formData.problem} onChange={handleChange} />
          <TargetSelect value={formData.targets} onChange={(val: string[]) => setFormData({ ...formData, targets: val })} />
          <StarRating label="Calificación promedio" name="rating" value={formData.rating} onChange={handleRatingChange} />
        </div>
      </div>

      {/* Tablas */}
      <div className="space-y-8 mt-8">
        <motion.div whileHover={{ scale: 1.01 }}>
          <RatingTable title={formData.sections.visual.title} questions={VisualQuestions} answers={formData.sections.visual.answers} onChange={(key, value, text) => handleRankingChange("visual", key, value, text)} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }}>
          <RatingTable title={formData.sections.technical.title} questions={TechnicalQuestions} answers={formData.sections.technical.answers} onChange={(key, value, text) => handleRankingChange("technical", key, value, text)} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }}>
          <RatingTable title={formData.sections.strategic.title} questions={StrategicQuestions} answers={formData.sections.strategic.answers} onChange={(key, value, text) => handleRankingChange("strategic", key, value, text)} />
        </motion.div>
      </div>

      {/* Botón */}
      <motion.div className="flex justify-end mt-10" whileHover={{ scale: 1.05 }}>
        <button
          type="submit"
          className="px-8 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 
            text-white shadow-lg shadow-cyan-500/30 hover:shadow-purple-500/40 
            transition-all duration-300"
        >
          🚀 Finalizar
        </button>
      </motion.div>
    </motion.form>
    </motion.div>
    </>

  );
};

export default ProductForm;
