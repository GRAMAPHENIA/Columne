import React from "react";
import { Task } from "../types/task";
import TrashIcon from "./Trash";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
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

  return (
    <div
      className="kanban-task transition-all bg-gray-900/80 hover:bg-gray-800/50 p-4 rounded-lg shadow-md cursor-move"
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
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="font-semibold text-white">{task.title}</h3>
      <p className="text-sm text-gray-300">{task.description}</p>
      <button
        className="text-red-400/90 mt-2 text-sm hover:text-red-400 bg-red-500/30 hover:bg-red-500/40 p-2 rounded-sm"
        onClick={() => onDelete(task.id)}
      >
        <TrashIcon />
      </button>
    </div>
  );
};
