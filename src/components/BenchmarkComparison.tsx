
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BenchmarkComparisonProps {
  category: string;
  userScore: number;
  eliteAverage: number;
  recommendations: string[];
}

const BenchmarkComparison = ({ 
  category, 
  userScore, 
  eliteAverage, 
  recommendations 
}: BenchmarkComparisonProps) => {
  const percentile = Math.round(100 - ((userScore / eliteAverage) * 100));
  const isBelow = userScore < eliteAverage;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{category} Elite Benchmark</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-2">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Your Score</span>
                <span className="text-sm font-medium">{userScore}</span>
              </div>
              <Progress
                value={(userScore / eliteAverage) * 100}
                className="h-2"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Elite Average</span>
                <span className="text-sm font-medium">{eliteAverage}</span>
              </div>
            </div>
          </div>

          {isBelow ? (
            <div className="text-sm">
              Your portfolio scores lower than <span className="font-semibold">{percentile}%</span> of top-tier portfolios in this category.
            </div>
          ) : (
            <div className="text-sm text-success">
              Congratulations! Your portfolio exceeds the elite average in this category.
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-1">Improvement Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenchmarkComparison;
