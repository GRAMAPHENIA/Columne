// components/Gamification/Achievement.tsx
import React from "react";

interface AchievementProps {
  name: string;
  description: string;
  points: number;
}

const Achievement: React.FC<AchievementProps> = ({ name, description, points }) => {
  return (
    <li className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <span className="text-teal-400 font-bold">{points} pts</span>
    </li>
  );
};

export default Achievement;
