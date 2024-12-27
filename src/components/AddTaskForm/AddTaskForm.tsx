import React, { useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { TagInput } from "./TagInput";
import Image from "next/image";
import Calendar from "../calendar/Calendar";
import { Task } from "@/types/task";

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
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const photoUrl = photo ? URL.createObjectURL(photo) : undefined;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      date: new Date().toISOString(),
      photoUrl,
      tags,
      columnId: "",
    };
    setTasks([...tasks, newTask]);
    onAddTask(title, description, photoUrl, tags);
    setTitle("");
    setDescription("");
    setPhoto(null);
    setPhotoPreview(null);
    setTags([]);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6 p-6 bg-gray-900 rounded-lg shadow-lg max-w-6xl mx-auto mb-4">
      <div className="col-span-1">
        <h3 className="text-xl font-bold mb-6 text-white">
          Añadir Nueva Tarea
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
            className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            aria-label="Título de la tarea"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            required
            rows={3}
            className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            aria-label="Descripción de la tarea"
          />

          {/* Etiquetas */}
          <TagInput tags={tags} setTags={setTags} />

          {/* Renderizar etiquetas */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-teal-500 text-white rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Subir imagen */}
          <PhotoUpload
            photo={photo}
            setPhoto={setPhoto}
            setPhotoPreview={setPhotoPreview}
          />

          {photoPreview && (
            <Image
              width={200}
              height={200}
              src={photoPreview}
              alt="Vista previa de la imagen seleccionada"
              className="h-20 w-full object-cover mt-4 rounded-lg border border-gray-700"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            aria-label="Añadir tarea"
          >
            Añadir Tarea
          </button>
        </form>
      </div>

      {/* Contenido vacío (las otras dos columnas) */}
      <div className="col-span-1 flex justify-center items-center">
        <div>
          <p className="text-xl font-bold mb-6 text-white">Contribuciones Mensuales</p>
          <Calendar tasks={tasks} />
        </div>
      </div>
    </div>
  );
};
