"use client";
import ProductForm from "@/components/ProductForm";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">

        <div className="mb-8">
          <h1
            className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Embudo de Productos
            </span> Dropshipping.
          </h1>

          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Esta herramienta permite evaluar productos para dropshipping a través de un análisis visual, técnico y estratégico, obteniendo métricas claras, conclusiones automáticas y reportes descargables en PDF para facilitar la toma de decisiones
          </p>
        </div>
      <div className="w-full max-w-5xl justify-center mx-auto">
        <ProductForm />
      </div>

      </div>
    </main>
  );
}
