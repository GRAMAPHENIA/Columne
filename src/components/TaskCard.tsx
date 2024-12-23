import React, { useState } from "react";
import { Task } from "../types/task";
import TrashIcon from "./Trash";
import Pencil from "./Pencil";
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

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    event.dataTransfer.setData("text/plain", taskId);
    (event.target as HTMLElement).classList.add("dragging");
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    (event.target as HTMLElement).classList.remove("dragging");
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
    <div
      className="kanban-task transition-all bg-gray-900/80 hover:bg-gray-800/50 p-4 rounded-lg shadow-md cursor-move my-4 border border-gray-700/50"
      draggable
      onDragStart={(event) => handleDragStart(event, task.id)}
      onDragEnd={handleDragEnd}
      role="listitem"
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
      <div className="flex justify-end mt-4 space-x-4">
        <button
          className="text-blue-400/90 text-sm hover:text-blue-400 bg-blue-500/30 hover:bg-blue-500/40 p-2 rounded-sm"
          onClick={() => onEdit(task)}
        >
          <Pencil />
        </button>
        <button
          className="text-red-400/90 text-sm hover:text-red-400 bg-red-500/30 hover:bg-red-500/40 p-2 rounded-sm"
          onClick={() => handleDelete(task.id)}
        >
          <TrashIcon />
        </button>
      </div>
      {message && (
        <div className="mt-2 text-sm text-white bg-gray-700 p-2 rounded">
          {message}
        </div>
      )}
    </div>
  );
};
