"use client";

import React from "react";
import { useTaskManager } from "../hooks/useTaskManager";
import { TaskColumn } from "./tasks/TaskColumn";
import { columns } from "@/data/columns";
import { useTaskModal } from "@/hooks/useTaskModal";
import { EditTaskModal } from "./tasks/EditTaskModal";
import { Task } from "@/types/task";
import { AddTaskForm } from "./AddTaskForm/AddTaskForm";

const Board: React.FC = () => {
  const { tasks, addTask, deleteTask, moveTask, updateTask } = useTaskManager();
  const { isModalOpen, taskToEdit, openModal, closeModal } = useTaskModal();

  const handleSaveTask = (updatedTask: Task) => {
    updateTask(updatedTask); // Usamos el hook para actualizar la tarea
    closeModal(); // Cerramos el modal
  };

  return (
    <div className="kanban-container flex flex-col p-4">
      <div className="flex flex-row space-x-4">
        {/* Formulario para añadir tareas */}
        <AddTaskForm onAddTask={addTask} />
      </div>
      {/* Tablero Kanban */}
      <div className="kanban-board flex space-x-4 w-full max-w-6xl">
        {columns.map((column) => (
          <TaskColumn
            key={column}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column)}
            onTaskDrop={(taskId) => moveTask(taskId, column)}
            onDeleteTask={deleteTask}
            onEditTask={openModal} // Pasamos la función para editar
          />
        ))}
      </div>

      {/* Modal de edición */}
      <EditTaskModal
        task={taskToEdit}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Board;
