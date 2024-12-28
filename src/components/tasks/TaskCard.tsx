import React, { useState, useRef } from "react";
import { Task } from "@/types/task";
import TrashIcon from "@/components/icons/Trash";
import Pencil from "@/components/icons/Pencil";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const taskCardRef = useRef<HTMLDivElement>(null); // Usamos un ref para el div

  const handleDragStart = (
    event: React.DragEvent<HTMLElement>, // Usamos el tipo más general para el evento
    taskId: string
  ) => {
    if (taskCardRef.current) {
      taskCardRef.current.classList.add("dragging"); // Accedemos al div usando ref
    }
    event.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragEnd = () => {
    if (taskCardRef.current) {
      taskCardRef.current.classList.remove("dragging"); // Accedemos al div usando ref
    }
  };

  const handleDelete = (taskId: string) => {
    try {
      onDelete(taskId); // Eliminar tarea
      setMessage("Tarea eliminada con éxito."); // Mensaje de éxito
    } catch {
      setMessage("Hubo un error al eliminar la tarea."); // Mensaje de error
    }

    // Borrar el mensaje después de 3 segundos
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <article
      ref={taskCardRef} // Asignamos el ref aquí
      className="kanban-task transition-all bg-gray-900/30 hover:bg-gray-800/50 p-4 rounded-lg shadow-md cursor-move my-4 border border-gray-700/50"
      draggable
      onDragStart={(event) => handleDragStart(event, task.id)}
      onDragEnd={handleDragEnd}
      role="listitem"
      aria-label={`Tarea ${task.title}`}
    >
      {task.photoUrl && (
        <Image
          width={300}
          height={200}
          src={task.photoUrl}
          alt={task.title}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="font-semibold text-white">{task.title}</h3>
      <p className="text-sm text-gray-300">{task.description}</p>

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
