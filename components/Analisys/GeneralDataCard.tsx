"use client";
import React from "react";
import { motion } from "framer-motion";

interface GeneralDataCardProps {
  name: string;
  purpose: string;
  problem: string;
  targets: string[];
  rating: number;
  image?: string;
}

const GeneralDataCard: React.FC<GeneralDataCardProps> = ({
  name,
  purpose,
  problem,
  targets,
  rating,
  image,
}) => {
  return (
    <motion.div
      className="card-container flex flex-col md:flex-row gap-6 p-6 justify-center items-center bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Columna de la imagen */}
      {image && (
        <motion.div
          className="flex-shrink-0 flex flex-col items-center container-gradient"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-bold mb-2 text-center">{name}</p>
          <img
            src={image}
            alt="Imagen del producto"
            className="w-full max-w-xs h-auto rounded-lg object-cover"
          />
        </motion.div>
      )}

      {/* Columna de la información */}
      <motion.div
        className="flex-1 text-white flex flex-col justify-center md:items-start text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // animación secuencial de los items
            },
          },
        }}
      >
        {[
          { label: "Finalidad", value: purpose },
          { label: "Problema que resuelve", value: problem },
          { label: "Targets", value: targets.join(", ") },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="mb-4"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-semibold">{item.label}:</p>
            <p className="ml-2">{item.value}</p>
          </motion.div>
        ))}

        {/* Calificación */}
        <motion.div
          className="mb-4"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-semibold">Calificación promedio:</p>
          <div className="ml-2 flex items-center">
            {Array.from({ length: rating }, (_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ⭐
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GeneralDataCard;
