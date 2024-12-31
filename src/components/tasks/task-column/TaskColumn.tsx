// Ruta: src/components/tasks/TaskColumn.tsx

import { ColumnType, Task } from "@/types/task"; 
import { forwardRef } from "react"; 
import { useDrop } from "react-dnd"; 
import { TaskCard } from "../TaskCard"; 
import "./TaskColumn.css"; 

// Propiedades esperadas para el componente TaskColumn
interface TaskColumnProps {
  column: ColumnType;
  tasks: Task[]; // Lista de tareas asociadas a la columna
  onMoveTask: (taskId: string, targetColumn: ColumnType) => void; // Función para mover una tarea entre columnas
  onDeleteTask: (taskId: string) => void; // Función para eliminar una tarea
  onEditTask: (task: Task) => void; // Función para editar una tarea
}

// Componente para representar columnas de tareas
const TaskColumn = forwardRef<HTMLDivElement, TaskColumnProps>(
  ({ column, tasks, onMoveTask, onDeleteTask, onEditTask }, ref) => {
    // Configuración del área de drop (donde se pueden soltar tareas)
    const [, drop] = useDrop({
      accept: "TASK", // Define que tipo de elementos acepta (en este caso, tareas)
      drop: (item: { id: string }) => {
        if (item?.id) {
          onMoveTask(item.id, column); // Mueve la tarea al dropearla en esta columna
        } else {
          console.warn("No se pudo mover la tarea porque falta el ID.");
        }
      },
    });

    // Combina la referencia de forwardRef y la de drop
    const dropRef = (node: HTMLDivElement | null) => {
      drop(node); // Conecta el área de drop
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
        ref={dropRef} // Asigna la referencia combinada
        className={`task-column ${column.toLowerCase() || "default"}`} // Asigna la clase CSS según la columna
      >
        <h2 className="task-column-title">{column}</h2>{" "}
        {/* Título de la columna */}
        <div className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id} // Llave única para identificar cada tarea
                task={task} // Información de la tarea
                onDelete={onDeleteTask} // Función para eliminar la tarea
                onEdit={onEditTask} // Función para editar la tarea
              />
            ))
          ) : (
            <p className="no-tasks">No hay tareas</p> // Mensaje si no hay tareas
          )}
        </div>
      </div>
    );
  }
);

// Define el nombre del componente para herramientas de depuración
TaskColumn.displayName = "TaskColumn";

export default TaskColumn;
