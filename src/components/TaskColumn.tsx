import React from "react";
import { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  column: string;
  tasks: Task[];
  onTaskDrop: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  tasks,
  onTaskDrop,
  onDeleteTask,
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
      className="kanban-column bg-gray-900/50 p-4 rounded-lg shadow-md flex-1 min-h-[200px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-labelledby={`${column}-column`}
    >
      <h2 id={`${column}-column`} className="text-xl font-bold mb-4 text-white">
        {column}
      </h2>
      <div className="task-list space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  );
};
