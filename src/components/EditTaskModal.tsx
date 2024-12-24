import React, { useState, useEffect } from "react";
import { Task } from "../types/task";

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

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPhotoUrl(task.photoUrl || "");
      setTags(task.tags?.join(", ") || "");
    }
  }, [task]);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="add-task bg-gray-900/50 rounded-lg p-6 shadow-lg w-96 border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-white">Editar Tarea</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Título</label>
          <input
            type="text"
            className="bg-gray-900/50 w-full border border-gray-700 rounded p-2 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Descripción</label>
          <textarea
            className="bg-gray-900/50 w-full border border-gray-700 rounded p-2 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">
            Foto (opcional)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="upload-photo"
            />
            <label
              htmlFor="upload-photo"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
            >
              Seleccionar Foto
            </label>
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Vista previa"
                className="w-16 h-16 rounded border border-gray-700"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Etiquetas (separadas por comas)</label>
          <input
            type="text"
            className="bg-gray-900/50 w-full border border-gray-700 rounded p-2 text-white"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
