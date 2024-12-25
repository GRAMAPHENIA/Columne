import React, { useState, useEffect } from "react";

// Datos de las tareas con niveles de dificultad
const tasksData = [
  {
    id: "1",
    title: "Primer tarea",
    difficulty: "easy",
    description: "Descripción de la primer tarea",
  },
  {
    id: "2",
    title: "Segunda tarea",
    difficulty: "medium",
    description: "Descripción de la segunda tarea",
  },
  {
    id: "3",
    title: "Tercer tarea",
    difficulty: "hard",
    description: "Descripción de la tercer tarea",
  },
];

// Datos de logros y recompensas
const achievementsData = [
  { id: "1", name: "🎉", description: "Completa tu primera tarea", points: 10 },
  { id: "2", name: "🏅", description: "Completa 10 tareas", points: 50 },
  {
    id: "3",
    name: "🏆",
    description: "Completa todas las tareas",
    points: 100,
  },
];

// Componente principal
const Gamification = () => {
  // Estado para los logros, puntos, tareas asignadas, y progreso
  const [achievements, setAchievements] = useState<string[]>([]);
  const [points, setPoints] = useState(0); // Inicializar puntos en 0
  const [assignedTask, setAssignedTask] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [experience, setExperience] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [taskPoints, setTaskPoints] = useState(0); // Puntos a sumar al completar una tarea

  // Función para desbloquear logros
  const unlockAchievement = (achievementId: string) => {
    if (!achievements.includes(achievementId)) {
      setAchievements([...achievements, achievementId]);
      const achievement = achievementsData.find((a) => a.id === achievementId);
      if (achievement) {
        if (achievementId === "1" && points === 0) {
          setTaskPoints(10); // Asignamos 10 puntos al completar la primera tarea
        }
      }

      // Asignar la primera tarea al desbloquear el logro "Primer tarea"
      if (achievementId === "1") {
        setAssignedTask(tasksData[0]);
      }
    }
  };

  // Función para completar una tarea
  const completeTask = () => {
    setTaskCompleted(true);
    setPoints(points + taskPoints); // Sumar los puntos correspondientes al completar la tarea
    setTaskPoints(0); // Reiniciar los puntos por tarea

    const nextTaskIndex =
      tasksData.findIndex((task) => task.id === assignedTask?.id) + 1;
    if (nextTaskIndex < tasksData.length) {
      setAssignedTask(tasksData[nextTaskIndex]);
    } else {
      setAssignedTask(null); // No hay más tareas
    }

    // Acumular experiencia por completar la tarea
    setExperience(experience + 20); // Añadimos 20 puntos de experiencia
  };

  // Filtrar tareas por dificultad seleccionada
  const filteredTasks = tasksData.filter(
    (task) => task.difficulty === selectedDifficulty
  );

  // Asignar la primera tarea filtrada al desbloquear el logro "Primer tarea"
  useEffect(() => {
    if (achievements.includes("1") && !assignedTask) {
      setAssignedTask(filteredTasks[0]);
    }
  }, [achievements, assignedTask, filteredTasks]);

  // Función para verificar si se puede desbloquear un logro
  const canUnlockAchievement = (achievementId: string) => {
    if (achievementId === "1") return true; // Primer logro siempre se puede desbloquear
    if (achievementId === "2")
      return achievements.includes("1") && taskCompleted; // Segundo logro depende del primero y la tarea completada
    if (achievementId === "3")
      return achievements.includes("2") && taskCompleted; // Tercer logro depende del segundo y la tarea completada
    return false;
  };

  return (
    <div className="p-6 rounded-lg bg-gray-900 text-white shadow-lg w-[450px]">
       <p className="flex justify-end mb-4">
        Puntos totales: <span className="font-semibold text-teal-500 ml-2">{points}</span>
      </p>
      {/* Sección de puntos y logros */}
      <h2 className="text-xl text-teal-500 font-bold mb-4 text-6xl text-center">Logros</h2>
      {/* Sección de desbloqueo de logros */}
      <div className="mt-6">
        <h3 className="text-lg text-rose-500 font-semibold mb-2">Desbloquear</h3>
        <div className="flex space-x-2">
          {achievementsData.map((achievement) => (
            <button
              key={achievement.id}
              onClick={() => unlockAchievement(achievement.id)}
              className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${
                achievements.includes(achievement.id) ||
                !canUnlockAchievement(achievement.id)
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
              disabled={
                achievements.includes(achievement.id) ||
                !canUnlockAchievement(achievement.id)
              }
            >
              {achievement.name}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de progreso */}
      <div
        className="progress-bar mb-4"
        style={{ width: `${(experience / 100) * 100}%` }}
      ></div>

      {/* Lista de logros obtenidos */}
      <ul className="space-y-2">
        {achievements.map((id) => {
          const achievement = achievementsData.find((a) => a.id === id);
          return (
            <li
              key={id}
              className="p-3 bg-gray-800 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{achievement?.name}</h3>
                <p className="text-sm text-gray-400">
                  {achievement?.description}
                </p>
              </div>
              <span className="text-teal-400 font-bold">
                {achievement?.points} pts
              </span>
            </li>
          );
        })}
      </ul>

      {/* Sección de tareas */}
      <div className="mt-6">
        <h3 className="text-lg text-blue-400 font-semibold mb-2">Tarea Asignada</h3>
        {assignedTask ? (
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="font-bold">{assignedTask.title}</h4>
            <p>{assignedTask.description}</p>

            {/* Botón para completar tarea */}
            {/* <button
              onClick={completeTask}
              disabled={taskCompleted}
              className={`mt-4 px-4 py-2 rounded-lg shadow-md ${taskCompleted ? "bg-teal-500" : "bg-gray-600"} text-white`}
            >
              Completar Tarea
            </button> */}
          </div>
        ) : (
          <p className="text-gray-400">No hay tarea asignada.</p>
        )}
      </div>

      {/* Opciones de dificultad */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Selecciona la Dificultad</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedDifficulty("easy")}
            className={`px-4 py-2 rounded-lg shadow-md ${selectedDifficulty === "easy" ? "bg-teal-500" : "bg-gray-700"}`}
          >
            Fácil
          </button>
          <button
            onClick={() => setSelectedDifficulty("medium")}
            className={`px-4 py-2 rounded-lg shadow-md ${selectedDifficulty === "medium" ? "bg-teal-500" : "bg-gray-700"}`}
          >
            Medio
          </button>
          <button
            onClick={() => setSelectedDifficulty("hard")}
            className={`px-4 py-2 rounded-lg shadow-md ${selectedDifficulty === "hard" ? "bg-teal-500" : "bg-gray-700"}`}
          >
            Difícil
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Gamification;
