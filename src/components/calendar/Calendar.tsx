import React from "react";
import styles from "./Calendar.module.css";
import { Task } from "@/types/task";

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const renderCalendar = () => {
    const calendar = [];
    for (let i = 0; i < 60; i++) {
      const dayTasks = tasks.filter(
        (task) => new Date(task.date).getDate() === i + 1
      );
      const taskCount = dayTasks.length;
      const color =
        taskCount > 0
          ? `rgba(56, 178, 172, ${Math.min(taskCount / 10, 1)})
`
          : "transparent"; // Color azul pastel basado en la cantidad de tareas

      const tooltipContent = dayTasks
        .map(
          (task) => `${task.title} ${new Date(task.date).toLocaleDateString()}`
        )
        .join("\n");

      calendar.push(
        <div key={i} className={styles.day} style={{ backgroundColor: color }}>
          {taskCount > 0 && (
            <div className={styles.tooltip}>{tooltipContent}</div>
          )}
        </div>
      );
    }
    return calendar;
  };

  return <div className={styles.calendar}>{renderCalendar()}</div>;
};

export default Calendar;
