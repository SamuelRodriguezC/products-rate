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
  const [currentStep, setCurrentStep] = useState(1);

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

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="bg-gray-950/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-800 p-8">
      {/* Steps indicator */}
      <div className="flex justify-center mb-6 space-x-4">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              currentStep === step
                ? "bg-cyan-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {currentStep === 1 && (
        <ProductDetail
            formData={formData}
            handleChange={handleChange}
            handleRatingChange={handleRatingChange}
            setTargets={(val) => setFormData({ ...formData, targets: val })}
          />
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cyan-400">
            Ranking de Evaluación
          </h2>
          {Object.keys(formData.ranking).map((key) => (
            <div key={key} className="flex justify-between items-center">
              <label className="capitalize">{key}</label>
              <select
                name={key}
                value={formData.ranking[key as keyof typeof formData.ranking]}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 focus:border-cyan-400 outline-none"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 2 && (
        <div className="space-y-4 text-center">
          <RatingTable />
          <p className="text-lg mt-6">
            🔥 Efectividad estimada:{" "}
            <span className="font-bold text-cyan-400">
              {calcularEfectividad()}%
            </span>
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            ← Anterior
          </button>
        ) : (
          <div />
        )}
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
          >
            Siguiente →
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
