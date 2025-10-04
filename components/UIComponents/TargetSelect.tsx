"use client"
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";

const TARGET_OPTIONS = [
  // 🔸 Etapas de vida
  { value: "Bebés", description: "0 a 4 años (primera infancia)" },
  { value: "Niños", description: "5 a 12 años (infancia)" },
  { value: "Adolescentes", description: "13 a 17 años" },
  { value: "Jóvenes", description: "18 a 25 años" },
  { value: "Adultos", description: "26 a 59 años" },
  { value: "Adultos Mayores", description: "60 años en adelante" },

  // 🔸 Género / Identidad
  { value: "Hombres", description: "Jóvenes y adultos masculinos" },
  { value: "Mujeres", description: "Jóvenes y adultas femeninas" },


  // 🔸 Roles familiares
  { value: "Madres", description: "Mujeres con hijos" },
  { value: "Padres", description: "Hombres con hijos" },
  { value: "Parejas", description: "Personas en relación de pareja" },
  { value: "Solteros", description: "Personas sin pareja estable" },
  { value: "Familias", description: "Núcleos familiares con varios integrantes" },


  // 🔸 Educación / profesión
  { value: "Estudiantes", description: "Personas en formación académica" },
  { value: "Universitarios", description: "Estudiantes de educación superior" },
  { value: "Profesionales", description: "Trabajadores con experiencia en distintas áreas" },
  { value: "Emprendedores", description: "Personas que crean y gestionan negocios" },
  { value: "Ejecutivos", description: "Personas en cargos directivos" },

  // 🔸 Estilo de vida
  { value: "Deportistas", description: "Personas activas físicamente" },
  { value: "Gamers", description: "Jugadores de videojuegos" },
  { value: "Foodies", description: "Personas apasionadas por la gastronomía" },
  { value: "Viajeros", description: "Personas que disfrutan explorar lugares" },
  { value: "Salud Y Bienestar", description: "Personas interesadas en alimentación, fitness, yoga" },

];


interface TargetSelectProps {
  value: string[];
  onChange: (val: string[]) => void;
  error?: string; // <-- Recibe el error opcional
}

const TargetSelect: React.FC<TargetSelectProps> = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((v) => v !== tag));
  };

  // cerrar si se da clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      {/* Toggle */}
      <div
        className="w-full border-2 border-gray-700  rounded-lg px-2 py-2 flex flex-wrap items-center gap-1 bg-gray-900 cursor-pointer min-h-[46px] relative"
        onClick={() => setOpen(!open)}
      >
        {/* Tags seleccionados */}
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {value.map((tag) => {
              const option = TARGET_OPTIONS.find(o => o.value === tag);
              return (
                <div
                  key={tag}
                    className="flex items-center relative z-10 bg-base-100 border-2 border-cyan-300 rounded-full px-2 py-1 text-sm"
                >
                  <span className="whitespace-nowrap text-gray-200">{tag}</span>
                  <button
                    type="button"
                    className="ml-2 text-gray-100 hover:text-cyan-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400 text-sm px-1">
            Selecciona público objetivo...
          </span>
        )}

        {/* caret */}
        <ChevronDown
          className={`ml-auto w-5 h-5 text-gray-100 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-gray-900 border border-gray-300 rounded-lg shadow-lg z-10 max-h-50 overflow-y-auto">
          {TARGET_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-600 cursor-pointer relative"
            >
              {/* texto */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">{option.value}</span>
                <span className="text-xs text-gray-400">{option.description}</span>
              </div>

              {/* check a la derecha */}
              {value.includes(option.value) && (
                <Check className="ml-auto text-cyan-600 w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      )}
            {/* Mensaje de error */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TargetSelect;
