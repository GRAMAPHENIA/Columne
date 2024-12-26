import React, { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Agregar etiqueta"
          className="flex-1 p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none w-1/2"
          aria-label="Agregar etiqueta"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          aria-label="Añadir etiqueta"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};
