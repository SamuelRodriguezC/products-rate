"use client";
import React, { useState } from "react";
import FileInput from "./UIComponents/FileInput";
import TextInput from "./UIComponents/TextInput";
import StarRating from "./UIComponents/StarRating";
import TargetSelect from "./UIComponents/TargetSelect";
import RatingTable from "./UIComponents/RatingTable";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    problem: "",
    rating: 0,
    targets: [] as string[],
    ranking: Array(9).fill(0), // 9 preguntas con valor inicial 0
  });

  const [submittedData, setSubmittedData] = useState<any>(null);

  // ⭐ Guardar calificación promedio
  const handleRatingChange = (value: number) => {
    setFormData({ ...formData, rating: value });
  };

  // ⭐ Guardar cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ⭐ Guardar cambios en tabla
  const handleRankingChange = (index: number, value: number) => {
    const updatedRanking = [...formData.ranking];
    updatedRanking[index] = value;
    setFormData({ ...formData, ranking: updatedRanking });
  };

  const calcularEfectividad = () => {
    const totalPreguntas = formData.ranking.length;
    const maxPuntaje = totalPreguntas * 5;
    const suma = formData.ranking.reduce((a, b) => a + b, 0);
    return Math.round((suma / maxPuntaje) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    setSubmittedData(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-950/70 rounded-2xl p-8">
      {/* Inputs básicos */}
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

      {/* Tabla */}
      <div className="space-y-4 text-center">
        <RatingTable 
          title="Calificación de cada criterio"
          answers={formData.ranking}
          onChange={handleRankingChange}
        />
        <p className="text-lg mt-6">
          🔥 Efectividad estimada:{" "}
          <span className="font-bold text-cyan-400">{calcularEfectividad()}%</span>
        </p>
      </div>

      {/* Botón */}
      <div className="flex justify-between mt-8">
        <button type="submit" className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
          Finalizar
        </button>
      </div>

      {/* Mostrar datos enviados */}
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
