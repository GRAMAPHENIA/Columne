
// Archivo: components/KanbanBoard.tsx
"use client";

import React from "react";
import { useTaskManager } from "../hooks/useTaskManager";
import { AddTaskForm } from "./AddTaskForm";
import { TaskColumn } from "./TaskColumn";
import { columns } from "@/data/columns";

const KanbanBoard: React.FC = () => {
  const { tasks, addTask, deleteTask, moveTask } = useTaskManager();

  return (
    <div className="kanban-container flex space-x-4 p-4">
      {/* Formulario para añadir tareas */}
      <AddTaskForm onAddTask={addTask} />

      {/* Tablero Kanban */}
      <div className="kanban-board flex space-x-4 w-3/4">
        {columns.map((column) => (
          <TaskColumn
            key={column}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column)}
            onTaskDrop={(taskId) => moveTask(taskId, column)}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;