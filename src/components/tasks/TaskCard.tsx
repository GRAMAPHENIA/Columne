import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";
import { Task } from "@/types/task";
import TrashIcon from "@/components/icons/Trash";
import Pencil from "@/components/icons/Pencil";

// Componente para representar cada tarea
interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [message, setMessage] = useState<string | null>(null);

  // Integración con react-dnd para arrastrar tareas
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK", // Tipo de elemento para react-dnd
    item: { id: task.id }, // Datos enviados al soltar el elemento
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Estado de arrastre
    }),
  }));

  // Referencia local combinada con dragRef
  const localRef = useRef<HTMLElement>(null);
  const combinedRef = (node: HTMLElement | null) => {
    dragRef(node);
    localRef.current = node;
  };

  const handleDelete = (taskId: string) => {
    try {
      onDelete(taskId);
      setMessage("Tarea eliminada con éxito.");
    } catch {
      setMessage("Hubo un error al eliminar la tarea.");
    }
    setTimeout(() => setMessage(null), 3000); // Limpiar mensaje después de 3 segundos
  };

  return (
    <article
      ref={combinedRef}
      className={` kanban-task transition-all bg-gray-900/30 hover:bg-gray-800/50 p-4 rounded-lg shadow-md cursor-move my-4 border border-gray-700/50 ${
        isDragging ? "opacity-10 dragging" : ""
      }`}
      role="listitem"
      aria-label={`Tarea ${task.title}`}
    >
      {task.photoUrl && (
        <Image
          width={300}
          height={200}
          src={task.photoUrl}
          alt={task.title}
          className="w-full h-32 object-cover rounded-md mb-4 shadow-md border border-slate-700"
        />
      )}
      <h3 className="font-semibold text-blue-200">{task.title}</h3>
      <p className="font-extralight text-sm text-gray-300">{task.description}</p>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-gray-200 bg-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4 space-x-4">
        <button
          className="text-blue-400/90 text-sm hover:text-blue-400 bg-blue-500/30 hover:bg-blue-400/30 p-2 rounded-sm"
          onClick={() => onEdit(task)}
          aria-label="Editar tarea"
        >
          <Pencil />
        </button>
        <button
          className="text-red-400/90 text-sm hover:text-red-400 bg-red-500/30 hover:bg-red-500/50 p-2 rounded-sm"
          onClick={() => handleDelete(task.id)}
          aria-label="Eliminar tarea"
        >
          <TrashIcon />
        </button>
      </div>

      {message && (
        <div
          className="mt-2 text-sm text-white bg-gray-700 p-2 rounded"
          role="alert"
        >
          {message}
        </div>
      )}
    </article>
  );
};

