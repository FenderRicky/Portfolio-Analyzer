
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  category: 'performance' | 'seo' | 'accessibility' | 'bestPractices';
}

const ScoreCard = ({ title, score, description, category }: ScoreCardProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    // Animate the score counting up
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  const getColorClass = () => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-info";
    if (score >= 50) return "text-warning";
    return "text-danger";
  };
  
  const getScoreBackground = () => {
    if (score >= 90) return "bg-success/20";
    if (score >= 70) return "bg-info/20";
    if (score >= 50) return "bg-warning/20";
    return "bg-danger/20";
  };

  const getProgressColor = () => {
    if (score >= 90) return "bg-success";
    if (score >= 70) return "bg-info";
    if (score >= 50) return "bg-warning";
    return "bg-danger";
  };

  const getIcon = () => {
    switch(category) {
      case 'performance':
        return (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'seo':
        return (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        );
      case 'accessibility':
        return (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          </svg>
        );
      case 'bestPractices':
        return (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4 12 14.01l-3-3" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-md", getScoreBackground())}>
            {getIcon()}
          </div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <div className={cn("text-2xl font-bold transition-all", getColorClass())}>
            {displayScore}
          </div>
          <div className="text-xs text-muted-foreground">out of 100</div>
        </div>
        <Progress 
          value={displayScore} 
          className={cn("h-2 mb-2", getProgressColor())}
        />
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
