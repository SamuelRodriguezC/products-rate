import React, { useRef, useState, useEffect } from "react";
import { Trash2, Upload, Loader2 } from "lucide-react";

interface FileInputProps {
  onFileSelect: (fileUrl: string | null) => void;
  error?: string; // <-- Recibe el error opcional
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect, error }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setLoading(true);

        // Simular carga de 2 segundos
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        // Guardar también en base64
        const reader = new FileReader();
        reader.onloadend = () => {
          onFileSelect(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
        onFileSelect(null);
      }
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`relative w-full max-w-xs h-80 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition overflow-hidden flex-shrink-0 ${
          previewUrl
            ? "border-cyan-400 bg-cyan-50/5"
            : "border-cyan-400 hover:bg-cyan-50/5"
        } ${error ? "border-red-500" : ""}`} // <-- borde rojo si hay error
        onClick={() => !selectedFile && inputRef.current?.click()}
      >
        {!selectedFile && (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-cyan-400 mb-2" />
            <p className={`font-medium ${error ? "text-red-500" : "text-cyan-400"}`}>Subir Imagen</p>
          </div>
        )}

        {selectedFile && previewUrl && (
          <>
            <img
              src={previewUrl}
              alt="preview"
              className={`w-full h-full object-cover transition ${loading ? "grayscale" : ""}`}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            )}
            {!loading && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 p-2 rounded-full shadow-md hover:bg-red-600 transition"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            )}
          </>
        )}

        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".jpg,.jpeg,.png"
        />
      </div>

      {/* Mensaje de error */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
