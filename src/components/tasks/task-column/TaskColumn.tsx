import React, { forwardRef } from 'react'
import { useDrop } from 'react-dnd'
import { TaskCard } from '@/components/tasks/TaskCard'
import { Task, ColumnType } from '@/types/task'

interface TaskColumnProps {
  column: ColumnType
  tasks: Task[]
  onMoveTask: (taskId: string, targetColumn: ColumnType) => void
  onDeleteTask: (taskId: string) => void
  onEditTask: (task: Task) => void
}

const TaskColumn = forwardRef<HTMLDivElement, TaskColumnProps>(
  ({ column, tasks, onMoveTask, onDeleteTask, onEditTask }, ref) => {
    const [, drop] = useDrop({
      accept: 'TASK',
      drop: (item: { id: string }) => {
        onMoveTask(item.id, column)
      },
    })

    // Se utiliza `drop` y `ref` para conectar el contenedor del drop
    const dropRef = (node: HTMLDivElement | null) => {
      drop(node)
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
    }

    return (
      <div
        ref={dropRef} // Asigna la referencia combinada de `drop` y `forwardRef`
        className="bg-slate-800 p-4 rounded-lg shadow flex-1 min-h-[300px]"
      >
        <h2 className="text-lg font-semibold mb-4 text-blue-400">{column}</h2>
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
      </div>
    )
  }
)

// Añadiendo displayName para la depuración
TaskColumn.displayName = 'TaskColumn'

export default TaskColumn
