
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface Fix {
  id: string;
  title: string;
  description: string;
  impact: string;
  codeSnippet?: string;
}

interface AutomatedFixesProps {
  fixes: Fix[];
}

const AutomatedFixes = ({ fixes }: AutomatedFixesProps) => {
  const handleApplyFix = (fixId: string, title: string) => {
    // In a real app, this would actually apply the fix to the code
    console.log(`Applying fix: ${fixId}`);
    toast.success(`Applied fix: ${title}`);
  };

  const handleApplyAll = () => {
    console.log("Applying all fixes");
    toast.success("Applied all fixes");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">One-Click Fixes</h3>
        <Button 
          variant="outline" 
          onClick={handleApplyAll}
          className="gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4 12 14.01l-3-3" />
          </svg>
          Apply All Fixes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fixes.map((fix) => (
          <Card key={fix.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">{fix.title}</CardTitle>
              <CardDescription>{fix.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              {fix.codeSnippet && (
                <pre className="p-2 bg-muted rounded-md overflow-x-auto text-xs">
                  <code>{fix.codeSnippet}</code>
                </pre>
              )}
              <div className="mt-2 text-sm">
                <span className="font-medium">Impact:</span> {fix.impact}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                size="sm" 
                onClick={() => handleApplyFix(fix.id, fix.title)}
                className="w-full"
              >
                Apply Fix
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AutomatedFixes;
