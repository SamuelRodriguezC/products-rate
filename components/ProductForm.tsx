"use client";
import React, { useState } from "react";
import Textarea from "./UIComponents/Textarea";
import FileInput from "./UIComponents/FileInput";
import TextInput from "./UIComponents/TextInput";
import StarRating from "./UIComponents/StarRating";
import TargetSelect from "./UIComponents/TargetSelect";
import RatingTable from "./UIComponents/RatingTable";
import ProductDetail from "./ProductDetail";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    problem: "",
    rating: 0,
    targets: [] as string[],
    ranking: {
      generalizacion: 1,
      branding: 1,
      tendencia: 1,
      dificultad: 1,
      valoraciones: 1,
      tamano: 1,
    },
  });

  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleRatingChange = (value: number) => {
    setFormData({ ...formData, rating: value });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (Object.keys(formData.ranking).includes(name)) {
      setFormData({
        ...formData,
        ranking: { ...formData.ranking, [name]: Number(value) },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calcularEfectividad = () => {
    const totalPreguntas = Object.keys(formData.ranking).length;
    const maxPuntaje = totalPreguntas * 5;
    const suma = Object.values(formData.ranking).reduce((a, b) => a + b, 0);
    return Math.round((suma / maxPuntaje) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    setSubmittedData(formData); // Guarda los datos para mostrarlos en pantalla
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-950/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-800 p-8"
    >
      {/* STEP 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Columna 1: Foto */}
        <div className="col-span-2 flex h-full">
          <FileInput />
        </div>

        {/* Columna 2: Campos */}
        <div className="col-span-2 md:col-span-2 flex flex-col gap-4">
          <TextInput
            name="name"
            type="text"
            label="Nombre del producto"
            placeholder="Escribe el nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            name="purpose"
            type="text"
            label="¿Para qué sirve?"
            placeholder="Escribe la finalidad"
            value={formData.purpose}
            onChange={handleChange}
          />
          <TextInput
            name="problem"
            type="text"
            label="¿Qué problema resuelve?"
            placeholder="Describe el problema"
            value={formData.problem}
            onChange={handleChange}
          />
          <TargetSelect
            value={formData.targets}
            onChange={(val: string[]) =>
              setFormData({ ...formData, targets: val })
            }
          />
          <StarRating
            label="Calificación promedio de clientes"
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
          />
        </div>
      </div>

      <div className="space-y-4 text-center">
        <RatingTable title="Calificación de cada criterio" />
        <p className="text-lg mt-6">
          🔥 Efectividad estimada:{" "}
          <span className="font-bold text-cyan-400">
            {calcularEfectividad()}%
          </span>
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
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
