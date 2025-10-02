"use client";
import React from "react";
import FileInput from "./UIComponents/FileInput";
import TextInput from "./UIComponents/TextInput";
import StarRating from "./UIComponents/StarRating";
import TargetSelect from "./UIComponents/TargetSelect";

interface ProductDetailProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleRatingChange: (value: number) => void;
  setTargets: (val: string[]) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  formData,
  handleChange,
  handleRatingChange,
  setTargets,
}) => {
  return (
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
      onChange={setTargets}
    />
    <StarRating
      label="Calificación promedio de clientes"
      name="rating"
      value={formData.rating}
      onChange={handleRatingChange}
    />
  </div>
</div>
  );
};

export default ProductDetail;
