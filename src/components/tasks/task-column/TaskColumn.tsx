import { ColumnType, Task } from "@/types/task";
import { forwardRef } from "react";
import { useDrop } from "react-dnd";
import { TaskCard } from "../TaskCard";

// Componente para representar columnas de tareas
interface TaskColumnProps {
  column: ColumnType;
  tasks: Task[];
  onMoveTask: (taskId: string, targetColumn: ColumnType) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskColumn = forwardRef<HTMLDivElement, TaskColumnProps>(
  ({ column, tasks, onMoveTask, onDeleteTask, onEditTask }, ref) => {
    const [, drop] = useDrop({
      accept: "TASK", // Acepta tareas para dropear
      drop: (item: { id: string }) => {
        if (item?.id) {
          onMoveTask(item.id, column);
        } else {
          console.warn("No se pudo mover la tarea porque falta el ID.");
        }
      },
    });

    // Ref combinada para forwardRef y drop
    const dropRef = (node: HTMLDivElement | null) => {
      drop(node);
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else if ("current" in ref) {
          ref.current = node;
        }
      }
    };

    return (
      <div
        ref={dropRef}
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
    );
  }
);

TaskColumn.displayName = "TaskColumn";

export default TaskColumn;