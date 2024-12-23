import React, { useState } from "react";
import Image from "next/image";

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
    <div className="add-task bg-gray-900/50 p-4 rounded-lg shadow-md w-1/4">
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
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full mb-2 p-2 border border-gray-500/20 rounded-lg bg-gray-900/80 text-white"
        />
        {photoPreview && (
          <Image
          width={200}
          height={200}
            src={photoPreview}
            alt="Vista previa"
            className="w-full mb-2 rounded-lg"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600/20 text-white py-2 px-4 rounded-lg hover:bg-blue-700/30"
        >
          Añadir
        </button>
      </form>
    </div>
  );
};
