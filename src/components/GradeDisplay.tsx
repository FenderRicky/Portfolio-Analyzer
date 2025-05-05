
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
      case "A": return "bg-success text-success-foreground";
      case "B": return "bg-info text-info-foreground";
      case "C": return "bg-warning text-warning-foreground";
      case "D": return "bg-orange-500 text-white";
      case "F": return "bg-danger text-danger-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className={cn("flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold", getGradeColor(), className)}>
      {getGrade()}
    </div>
  );
};

export default GradeDisplay;
