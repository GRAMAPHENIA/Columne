import React, { useState, useEffect } from 'react'

interface TagInputProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState('')

  // Validación para evitar etiquetas duplicadas y vacías
  useEffect(() => {
    setTagInput((prev) => prev.trim()) // Eliminar espacios innecesarios al inicio y final
  }, [tagInput])

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prevTags) => [...prevTags, trimmedTag])
      setTagInput('') // Resetear el campo de texto
    }
  }

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div>
      <div className="flex items-center space-x-3 mb-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Agregar etiqueta"
          className="flex-1 p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
          aria-label="Agregar etiqueta"
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={!tagInput.trim()}
          className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
            !tagInput.trim() ? 'opacity-50 cursor-not-allowed' : ''
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
            className="flex items-center px-3 py-1 text-sm bg-purple-600 text-white rounded-lg"
            role="listitem"
          >
            {tag}
            <button
              onClick={() => handleDeleteTag(tag)}
              className="ml-2 text-white bg-red-600 rounded-full p-1 hover:bg-red-700"
              aria-label={`Eliminar etiqueta ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
