import React, { useState, useEffect } from "react";
import { Task } from "@/types/task";
import Image from "next/image";
import UploadPhoto from "../icons/UploadPhoto";

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [tags, setTags] = useState<string>("");

  // Efecto para inicializar los valores cuando la tarea cambia
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPhotoUrl(task.photoUrl || "");
      setTags(task.tags?.join(", ") || "");
    }
  }, [task]);

  // Función para manejar la acción de guardar los cambios
  const handleSave = () => {
    if (task) {
      onSave({
        ...task,
        title,
        description,
        photoUrl,
        tags: tags.split(",").map((tag) => tag.trim()),
      });
    }
    onClose();
  };

  // Función para manejar la subida de imágenes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  // Efecto para deshabilitar el scroll del fondo al abrir el modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.getElementById("task-title")?.focus(); // Enfocar el título automáticamente
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !task) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/90 backdrop-blur-xl flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gap-6 p-6 bg-gray-900 rounded-lg shadow-lg max-w-6xl mx-auto border border-gray-700">
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-6 text-blue-500">Editar Tarea</h3>
          <form className="lg:w-[600px] space-y-2">
            {/* Título */}
            <label htmlFor="task-title" className="text-white">
              Título
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              required
              className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="Título de la tarea"
            />

            {/* Descripción */}
            <div className="">
              <label htmlFor="task-description" className="text-white">
                Descripción
              </label>
            </div>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
              required
              rows={3}
              className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="Descripción de la tarea"
            />

            {/* Subir imagen */}
            <div className="">
              <label htmlFor="edit-photo-upload" className="text-white">
                Imagen
              </label>
            </div>
            <div className="w-full">
              <label
                htmlFor="edit-photo-upload"
                className="block flex justify-center w-full text-center cursor-pointer text-teal-500 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                aria-label="Subir foto"
              >
                <UploadPhoto />
              </label>
              <input
                id="edit-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-labelledby="edit-photo-upload"
              />
            </div>
            {photoUrl && (
              <Image
                src={photoUrl}
                alt="Vista previa de la imagen seleccionada"
                width={300}
                height={300}
                className="h-20 w-full object-cover rounded-lg border border-gray-700"
              />
            )}

            {/* Etiquetas */}
            <div className="">
              <label htmlFor="task-tags" className="text-white">
                Etiquetas ⟮separadas por comas⟯
              </label>
            </div>

            <input
              id="task-tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Etiquetas (separadas por comas)"
              className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="Etiquetas"
            />

            {/* Botones */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
