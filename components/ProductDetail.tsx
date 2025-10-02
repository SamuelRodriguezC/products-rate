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
    <><></></>
  );
};

export default ProductDetail;
