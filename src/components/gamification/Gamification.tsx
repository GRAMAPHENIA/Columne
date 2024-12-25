import React, { useState } from "react";

// Datos de los logros
const achievementsData = [
  { id: "1", name: "tr.", description: "Completa tu primera tarea", points: 10 },
  { id: "2", name: "jr.", description: "Completa 10 tareas", points: 50 },
  { id: "3", name: "sr.", description: "Completa todas las tareas", points: 100 },
];

// Lista de tareas
const tasksData = [
  { id: "1", title: "Primer tarea", description: "Descripción de la primer tarea" },
  { id: "2", title: "Segunda tarea", description: "Descripción de la segunda tarea" },
  { id: "3", title: "Tercer tarea", description: "Descripción de la tercer tarea" },
  // Añadir más tareas según sea necesario
];

const Gamification = () => {
  // Estado para los logros desbloqueados, los puntos acumulados y la tarea asignada
  const [achievements, setAchievements] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [assignedTask, setAssignedTask] = useState<{ id: string; title: string; description: string } | null>(null);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Función para desbloquear un logro
  const unlockAchievement = (achievementId: string) => {
    if (!achievements.includes(achievementId)) {
      setAchievements([...achievements, achievementId]);
      const achievement = achievementsData.find((a) => a.id === achievementId);
      if (achievement) setPoints(points + achievement.points);

      // Asignar la primera tarea al desbloquear el logro "Primer tarea"
      if (achievementId === "1") {
        setAssignedTask(tasksData[0]);
      }
    }
  };

  // Función para completar la tarea asignada
  const completeTask = () => {
    setTaskCompleted(true);
    const nextTaskIndex = tasksData.findIndex(task => task.id === assignedTask?.id) + 1;
    if (nextTaskIndex < tasksData.length) {
      setAssignedTask(tasksData[nextTaskIndex]);
    } else {
      setAssignedTask(null);
    }
  };

  // Función para verificar si se puede desbloquear un logro
  const canUnlockAchievement = (achievementId: string) => {
    if (achievementId === "1") return true; // Primer logro siempre se puede desbloquear
    if (achievementId === "2") return achievements.includes("1") && taskCompleted; // Segundo logro depende del primero y la tarea completada
    if (achievementId === "3") return achievements.includes("2") && taskCompleted; // Tercer logro depende del segundo y la tarea completada
    return false;
  };

  return (
    <div className="p-6 rounded-lg bg-gray-900 text-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Logros</h2>
      <p className="mb-4">Puntos totales: <span className="font-semibold">{points}</span></p>
      <ul className="space-y-2">
        {achievements.map((id) => {
          const achievement = achievementsData.find((a) => a.id === id);
          return (
            <li key={id} className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{achievement?.name}</h3>
                <p className="text-sm text-gray-400">{achievement?.description}</p>
              </div>
              <span className="text-teal-400 font-bold">{achievement?.points} pts</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Desbloquear Logro</h3>
        <div className="flex space-x-2">
          {achievementsData.map((achievement) => (
            <button
              key={achievement.id}
              onClick={() => unlockAchievement(achievement.id)}
              className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${
                achievements.includes(achievement.id) || !canUnlockAchievement(achievement.id)
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
              disabled={achievements.includes(achievement.id) || !canUnlockAchievement(achievement.id)}
            >
              {achievement.name}
            </button>
          ))}
        </div>
      </div>
      {assignedTask && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tarea Asignada</h3>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="font-bold">{assignedTask.title}</h4>
            <p>{assignedTask.description}</p>
            <button
              onClick={completeTask}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 focus:outline-none"
            >
              Completar Tarea
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamification;