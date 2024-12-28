import React, { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { TagInput } from "@/components/AddTaskForm/TagInput";

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!isOpen || !editedTask) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev!, [name]: value }));
  };


  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Editar Tarea</h2>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
        />
        <TagInput
          tags={editedTask.tags}
          setTags={function (): void {
            throw new Error("Function not implemented.");
          }} 
          // setTags={handleTagsChange} // Usando handleTagsChange aquí
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
