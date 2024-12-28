import { useState, useCallback } from 'react'
import { Task, ColumnType } from '@/types/task'

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = useCallback((newTask: Omit<Task, 'id'>) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { ...newTask, id: Date.now().toString() }
    ])
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }, [])

  const moveTask = useCallback((taskId: string, targetColumn: ColumnType) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, columnId: targetColumn } : task
      )
    )
  }, [])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }, [])

  return { tasks, addTask, deleteTask, moveTask, updateTask }
}

