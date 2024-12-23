import React, { useState } from "react";
import Image from "next/image";

import UploadPhotoIcon from "./UploadPhotoIcon";

interface AddTaskFormProps {
  onAddTask: (title: string, description: string, photoUrl?: string) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const photoUrl = photo ? URL.createObjectURL(photo) : undefined;
    onAddTask(title, description, photoUrl);
    setTitle("");
    setDescription("");
    setPhoto(null);
    setPhotoPreview(null);
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

        {/* Botón para subir foto al final */}
        <div className="flex items-center justify-start space-x-4 my-4">
          <label
            htmlFor="photo-upload"
            className="flex items-center justify-center cursor-pointer rounded-sm text-blue-400/90 text-md hover:text-blue-400 bg-blue-500/30 hover:bg-blue-500/40 p-1 shadow transition-all duration-200"
          >
            <UploadPhotoIcon />
            {/* <span className="px-2">Subir foto</span> */}
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
