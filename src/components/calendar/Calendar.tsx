import React, { useState } from "react";
import { Task } from "@/types/task";

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    new Date().getMonth()
  ); // Estado para el mes visible

  const today = new Date();

  // Agrupamos las tareas por mes
  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    const lastDayOfMonth = new Date(today.getFullYear(), monthIndex + 1, 0);

    // Generamos un arreglo con los días del mes
    const daysInMonth = Array.from(
      { length: lastDayOfMonth.getDate() },
      (_, dayIndex) => {
        const date = new Date(today.getFullYear(), monthIndex, dayIndex + 1);
        const tasksOnDay = tasks.filter(
          (task) => new Date(task.date).toDateString() === date.toDateString()
        );
        const intensity = Math.min(tasksOnDay.length / 5, 1);
        return { date, intensity, taskCount: tasksOnDay.length };
      }
    );

    return { monthIndex, daysInMonth };
  });

  const handleMouseEnter = (
    date: Date,
    taskCount: number,
    event: React.MouseEvent
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const argentinaDate = new Date(
      date.toLocaleString("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
      })
    );
    const formattedDate = argentinaDate.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Argentina/Buenos_Aires",
    });

    // Ajustamos el texto según el número de tareas
    const taskText = taskCount === 1 ? "1 tarea" : `${taskCount} tareas`;

    setTooltipContent(`${formattedDate}: ${taskText}`);
    setTooltipPosition({ x: rect.left, y: rect.top - 30 }); // Posicionar arriba del recuadro
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1)); // Retroceder un mes, o ir al último mes
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1)); // Avanzar un mes, o ir al primer mes
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold mb-6 text-teal-400">
        Contribuciones
      </h2>

      <div className="flex justify-between mb-4">
        <button
          className="text-blue-300 hover:text-blue-400 bg-blue-300/10 hover:bg-blue-300/20 rounded px-3 py-1"
          onClick={handlePreviousMonth}
        >
          &lt;
        </button>
        <h3 className="text-center text-lg font-semibold text-teal-300">
          {new Date(2024, currentMonthIndex).toLocaleString("es-AR", {
            month: "long",
          })}
        </h3>
        <button
          className="text-blue-300 hover:text-blue-400 bg-blue-300/10 hover:bg-blue-300/20 rounded px-3 py-1"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {" "}
        {/* Usamos gap-4 para agregar un espaciado horizontal y vertical entre los días */}
        {months[currentMonthIndex].daysInMonth.map(
          ({ date, intensity, taskCount }, dayIndex) => (
            <div
              key={dayIndex}
              className="w-16 h-16 rounded-md border border-gray-600/70 flex items-center justify-center cursor-pointer backdrop-blur-xl"
              style={{
                backgroundColor:
                  intensity === 0
                    ? "#2a4050" // Color de fondo cuando no hay tareas (verde oscuro)
                    : `rgba(100, 153, 125, ${Math.min(intensity * 1.5, 1)})`, // Verde azulado suave
              }}
              onMouseEnter={(e) => handleMouseEnter(date, taskCount, e)}
              onMouseLeave={handleMouseLeave}
            >
              {date.getDate()}
            </div>
          )
        )}
      </div>

      {tooltipContent && (
        <div
          className="absolute bg-slate-800 border border-slate-700 text-slate-300 p-2 rounded shadow-lg text-sm"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Calendar;
