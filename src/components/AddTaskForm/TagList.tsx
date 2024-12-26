import React from "react";

interface TagListProps {
  tags: string[];
  handleRemoveTag: (tag: string) => void;
}

export const TagList: React.FC<TagListProps> = ({ tags, handleRemoveTag }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
          role="listitem"
          aria-label={`Etiqueta: ${tag}`}
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
            aria-label={`Eliminar etiqueta: ${tag}`}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  );
};
