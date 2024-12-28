import React, { useState } from 'react'
import { Task } from '@/types/task'

interface CalendarProps {
  tasks: Task[]
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  const days = Math.floor((today.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  const startOfWeek = new Date(startOfYear.getTime() + (days - (days % 7)) * 24 * 60 * 60 * 1000)

  const weeks = Array.from({ length: 52 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(startOfWeek.getTime() + (weekIndex * 7 + dayIndex) * 24 * 60 * 60 * 1000)
      const tasksOnDay = tasks.filter(task => new Date(task.date).toDateString() === date.toDateString())
      const intensity = Math.min(tasksOnDay.length / 5, 1)
      return { date, intensity, taskCount: tasksOnDay.length }
    })
  })

  const handleMouseEnter = (date: Date, taskCount: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const argentinaDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }))
    const formattedDate = argentinaDate.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Argentina/Buenos_Aires'
    })
    setTooltipContent(`${formattedDate}: ${taskCount} tareas`)
    setTooltipPosition({ x: rect.left, y: rect.top - 30 }) // Posicionar arriba del recuadro
  }

  const handleMouseLeave = () => {
    setTooltipContent(null)
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-blue-400">Contribuciones Mensuales</h2>
      <div className="flex">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col">
            {week.map(({ date, intensity, taskCount }, dayIndex) => (
              <div
                key={dayIndex}
                className="w-3 h-3 m-0.5 rounded-sm border border-gray-700"
                style={{ 
                  backgroundColor: intensity === 0 ? '#1f2937' : `rgba(0, ${Math.floor(intensity * 255)}, ${Math.floor(intensity * 100)}, ${intensity})` 
                }}
                onMouseEnter={(e) => handleMouseEnter(date, taskCount, e)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        ))}
      </div>
      {tooltipContent && (
        <div 
          className="absolute bg-gray-800 text-blue-300 p-2 rounded shadow-lg text-sm"
          style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  )
}

export default Calendar

