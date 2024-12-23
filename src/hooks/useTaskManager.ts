import { useState, useEffect } from "react";
import { Task } from "../types/task";

//  Hook personalizado para gestionar tareas en un tablero Kanban.

export const useTaskManager = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Al montar el componente, carga las tareas desde el localStorage.

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  //  Cada vez que las tareas cambien, se guardan en el localStorage.

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Añade una nueva tarea al estado.
   * @param title - Título de la tarea.
   * @param description - Descripción de la tarea.
   * @param photoUrl - (Opcional) URL de la imagen asociada a la tarea.
   */
  const addTask = (title: string, description: string, photoUrl?: string) => {
    const newTask: Task = {
      id: Date.now().toString(), // ID único basado en la marca de tiempo.
      title,
      description,
      columnId: "Pendiente", // Se agrega a la columna "Pendiente" por defecto.
      photoUrl,
    };
    setTasks([...tasks, newTask]);
  };

  /**
   * Elimina una tarea basada en su ID.
   * @param taskId - ID de la tarea a eliminar.
   */
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  /**
   * Mueve una tarea a otra columna.
   * @param taskId - ID de la tarea a mover.
   * @param columnId - ID de la columna destino.
   */
  const moveTask = (taskId: string, columnId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId } : task
      )
    );
  };

  /**
   * Actualiza los datos de una tarea existente.
   * @param updatedTask - Objeto que contiene los datos actualizados de la tarea.
   */
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Retornamos las funciones y el estado para su uso en los componentes.
  return { tasks, addTask, deleteTask, moveTask, updateTask };
};
