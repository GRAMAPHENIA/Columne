import React, { useState, useEffect } from "react";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  // Validación para evitar etiquetas duplicadas y vacías
  useEffect(() => {
    setTagInput((prev) => prev.trim()); // Eliminar espacios innecesarios al inicio y final
  }, [tagInput]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prevTags) => [...prevTags, trimmedTag]);
      setTagInput(""); // Resetear el campo de texto
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Agregar etiqueta"
          className="flex-1 p-2 border border-slate-700 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Agregar etiqueta"
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={!tagInput.trim()}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
            !tagInput.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Añadir etiqueta"
        >
          Añadir
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center font- px-3 text-sm bg-blue-600 text-white/70 rounded-md"
            role="listitem"
          >
            {tag}
            <button
              onClick={() => handleDeleteTag(tag)}
              className="ml-1 text-xl text-red-300/80 hover:text-red-400 font-bold"
              aria-label={`Eliminar etiqueta ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
