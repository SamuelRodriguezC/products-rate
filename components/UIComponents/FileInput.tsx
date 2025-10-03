import React, { useRef, useState, useEffect } from "react";
import { Trash2, Upload } from "lucide-react";

interface FileInputProps {
  onFileSelect: (fileUrl: string | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Guardar también en base64 para análisis
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
        className={`w-full max-w-xs h-80 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition overflow-hidden flex-shrink-0 ${
          previewUrl
            ? "border-cyan-400 bg-cyan-50/5"
            : "border-cyan-400 hover:bg-cyan-50/5"
        }`}
        onClick={() => !selectedFile && inputRef.current?.click()}
      >
        {!selectedFile && (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-cyan-400 mb-2" />
            <p className="text-cyan-400 font-medium">Subir Imagen</p>
          </div>
        )}

        {selectedFile && previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            className="w-full h-full object-cover"
          />
        )}

        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".jpg,.jpeg,.png"
        />
      </div>

      {selectedFile && (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-3 flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 className="w-5 h-5" />
          Eliminar
        </button>
      )}
    </div>
  );
};

export default FileInput;
