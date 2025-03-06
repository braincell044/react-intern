// src/components/MatchScore.tsx
import React from 'react';

interface MatchScoreProps {
  score: number;
}

const MatchScore: React.FC<MatchScoreProps> = ({ score }) => {
  const getColorClass = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          style={{ width: `${score}%` }}
          className={`h-2.5 rounded-full ${getColorClass()}`}
        />
      </div>
      <span className="ml-2">{score}%</span>
    </div>
  );
};

export default MatchScore;
