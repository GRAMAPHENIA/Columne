import { useState, useEffect } from "react";
import { Task } from "../types/task";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string, photoUrl?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      columnId: "Pendiente",
      photoUrl,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId: string, columnId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId } : task
      )
    );
  };

  return { tasks, addTask, deleteTask, moveTask };
};