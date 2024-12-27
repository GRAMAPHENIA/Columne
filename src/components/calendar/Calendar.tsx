import React, { useState } from "react";
import styles from "./Calendar.module.css";
import { Task } from "@/types/task";

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const calendar = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayTasks = tasks.filter(
        (task) =>
          new Date(task.date).getDate() === i &&
          new Date(task.date).getMonth() === currentDate.getMonth()
      );
      const taskCount = dayTasks.length;
      const color =
        taskCount > 0
          ? `rgba(56, 178, 172, ${Math.min(taskCount / 5, 1)})`
          : "transparent";

      const isToday =
        i === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      calendar.push(
        <div
          key={i}
          className={`${styles.day} ${isToday ? styles.today : ""}`}
          style={{ backgroundColor: color }}
        >
          <span>{i}</span>
          <div className={styles.tooltip}>
            {taskCount} contribuciones en {i} de{" "}
            {currentDate.toLocaleString("default", { month: "long" })}
          </div>
        </div>
      );
    }
    return calendar;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        >
          &lt;
        </button>
        <h2 className="px-4 font-bold text-text-xl">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className={styles.calendar}>{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
