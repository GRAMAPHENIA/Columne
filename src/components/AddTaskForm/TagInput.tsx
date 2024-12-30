import React, { useState, Dispatch, SetStateAction } from "react";

interface TagInputProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>> | ((newTags: string[]) => void);
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  // Manejo de `setTags` para ambos casos
  const updateTags = (newTags: string[]) => {
    if (typeof setTags === "function") {
      setTags(newTags);
    } else {
      (setTags as Dispatch<SetStateAction<string[]>>)((prevTags) => [...prevTags, ...newTags]);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      updateTags([...tags, trimmedTag]);
      setTagInput(""); // Resetear el campo de texto
    }
  };

  const handleDeleteTag = (tag: string) => {
    updateTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value.trimStart())}
          placeholder="Agregar etiqueta"
          className="flex-1 p-2 border border-slate-700 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Agregar etiqueta"
          aria-describedby="tag-helper"
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
      {/* <div id="tag-helper" className="text-sm text-gray-400 mb-2">
        Presiona Añadir para incluir una etiqueta única.
      </div> */}
      <div className="flex flex-wrap gap-2" role="list">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center px-3 text-sm bg-blue-600 text-white/70 rounded-md"
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
