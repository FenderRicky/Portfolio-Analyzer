
import React from 'react';
import { cn } from "@/lib/utils";

interface GradeDisplayProps {
  score: number;
  className?: string;
}

const GradeDisplay = ({ score, className }: GradeDisplayProps) => {
  const getGrade = () => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const getGradeColor = () => {
    const grade = getGrade();
    switch (grade) {
      case "A": return "bg-green-500 text-white dark:bg-green-600";
      case "B": return "bg-blue-500 text-white dark:bg-blue-600";
      case "C": return "bg-yellow-500 text-white dark:bg-yellow-600";
      case "D": return "bg-orange-500 text-white dark:bg-orange-600";
      case "F": return "bg-red-500 text-white dark:bg-red-600";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className={cn("flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold", getGradeColor(), className)}>
      {getGrade()}
    </div>
  );
};

export default GradeDisplay;
