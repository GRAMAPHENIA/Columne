import React from "react";
import { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

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

  return (
    <div
      className="kanban-column bg-gray-900/50 p-4 rounded-lg shadow-md flex-1 min-w-[200px] space-y-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-labelledby={`${column}-column`}
    >
      <h2 id={`${column}-column`} className="text-xl font-bold mb-4 text-white">
        {column}
      </h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas de momento...</p>
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
