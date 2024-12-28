import { useState } from 'react'
import { Task } from '@/types/task'

export const useTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

  const openModal = (task: Task) => {
    setTaskToEdit(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setTaskToEdit(null)
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    taskToEdit,
    openModal,
    closeModal
  }
}

