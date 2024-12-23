import React from "react";
import { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

// Mapea las columnas a colores con opacidad de fondo y colores de texto
const columnColors: { [key: string]: { bg: string; text: string } } = {
  "Pendiente": { bg: "bg-blue-400/10", text: "text-blue-400" }, 
  "En progreso": { bg: "bg-amber-200/10", text: "text-amber-300" }, 
  "Finalizado": { bg: "bg-emerald-200/10", text: "text-emerald-300" }, 
};

interface TaskColumnProps {
  column: string;
  tasks: Task[];
  onTaskDrop: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  tasks,
  onTaskDrop,
  onDeleteTask,
  onEditTask,
}) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    onTaskDrop(taskId);
  };

  // Obtener el color de fondo y texto según la columna
  const { bg, text } = columnColors[column] || {
    bg: "bg-gray-900",
    text: "text-white",
  }; // Valores por defecto

  return (
    <div
      className={`${bg} p-4 rounded-lg flex-1 min-w-[200px] space-y-4 border border-gray-700/50`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-labelledby={`${column}-column`}
    >
      <h2 id={`${column}-column`} className={`text-xl font-bold mb-4 ${text}`}>
        {column}
      </h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay procesos de momento...</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask} // Pasamos la función onEditTask
            />
          ))
        )}
      </div>
    </div>
  );
};
