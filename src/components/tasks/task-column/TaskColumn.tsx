import React, { useCallback } from "react";
import { Task } from "@/types/task";
import { TaskCard } from "../TaskCard";
import "./TaskColumn.css";

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
  // Manejar arrastre sobre la columna
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // Manejar el soltar de una tarea en la columna
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    if (taskId) {
      onTaskDrop(taskId);
    } else {
      console.error("Invalid taskId");
    }
  }, [onTaskDrop]);

  const validColumns = ["Pendiente", "En progreso", "Finalizado"];

  if (!validColumns.includes(column)) {
    console.error(`Invalid column: ${column}`);
    return null;
  }

  return (
    <div
      className={`task-column ${column.toLowerCase().replace(" ", "-")}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-labelledby={`${column}-column`}
    >
      <h2 id={`${column}-column`} className="task-column-title">
        {column}
      </h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No hay procesos de momento...</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
};