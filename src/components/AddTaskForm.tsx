import React, { useState } from "react";
import Image from "next/image";

import UploadPhotoIcon from "./UploadPhotoIcon";

interface AddTaskFormProps {
  onAddTask: (
    title: string,
    description: string,
    photoUrl?: string,
    tags?: string[]
  ) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const photoUrl = photo ? URL.createObjectURL(photo) : undefined;
    onAddTask(title, description, photoUrl, tags);
    setTitle("");
    setDescription("");
    setPhoto(null);
    setPhotoPreview(null);
    setTags([]);
    setTagInput("");
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div className="add-task bg-gray-900/50 p-4 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold mb-4 text-white">Tarea</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
          className="w-full mb-2 p-2 border border-gray-500/20 rounded-lg bg-gray-900/80 text-white"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
          className="w-full mb-2 p-2 border border-gray-500/20 rounded-lg bg-gray-900/80 text-white"
        />

        {/* Manejo de etiquetas */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Agregar etiqueta"
              className="flex-1 p-2 border border-gray-500/20 rounded-lg bg-gray-900/80 text-white"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="text-sm text-blue-400 bg-blue-500/30 hover:bg-blue-500/40 p-2 rounded-sm shadow transition-all"
            >
              Añadir
            </button>
          </div>
          <div className="flex flex-wrap mt-2 space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-gray-800/80 text-white px-2 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-400 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Botón para subir foto */}
        <div className="flex items-center justify-start space-x-4 my-4">
          <label
            htmlFor="photo-upload"
            className="flex items-center justify-center cursor-pointer rounded-sm text-blue-400/90 text-md hover:text-blue-400 bg-blue-500/30 hover:bg-blue-500/40 p-1 shadow transition-all duration-200"
          >
            <UploadPhotoIcon />
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
        {/* Vista previa de la imagen */}
        {photoPreview && (
          <Image
            width={200}
            height={200}
            src={photoPreview}
            alt="Vista previa"
            className="rounded-sm h-20 w-auto my-4 opacity-70"
          />
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-gray-400/90 text-sm hover:text-emerald-100/40 bg-gray-800/30 hover:bg-gray-800/40 p-2 rounded-sm mt-4 shadow transition-all duration-200 border border-gray-500/20"
          >
            Añadir tarea
          </button>
        </div>
      </form>
    </div>
  );
};
