
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreCard from './ScoreCard';
import CodeBlock from './CodeBlock';
import SuggestionsList from './SuggestionsList';
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  results: {
    scores: {
      performance: number;
      seo: number;
      accessibility: number;
      bestPractices: number;
    };
    codeExamples: {
      html: { code: string; issue?: string; suggestion?: string; }[];
      css: { code: string; issue?: string; suggestion?: string; }[];
      js: { code: string; issue?: string; suggestion?: string; }[];
    };
    suggestions: {
      id: string;
      category: string;
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
    }[];
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard 
          title="Performance" 
          score={results.scores.performance} 
          description="Speed, responsiveness, and resource efficiency"
          category="performance"
        />
        <ScoreCard 
          title="SEO" 
          score={results.scores.seo} 
          description="Search engine optimization and findability"
          category="seo"
        />
        <ScoreCard 
          title="Accessibility" 
          score={results.scores.accessibility} 
          description="Usability for all users including those with disabilities"
          category="accessibility"
        />
        <ScoreCard 
          title="Best Practices" 
          score={results.scores.bestPractices} 
          description="Modern development standards and techniques"
          category="bestPractices"
        />
      </div>
      
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="code-issues">Code Issues</TabsTrigger>
          <TabsTrigger value="details">Detailed Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestions" className="animate-fade-in">
          <SuggestionsList suggestions={results.suggestions} />
          
          <div className="flex justify-center mt-8">
            <Button disabled className="gap-2">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Full Report (Coming Soon)
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="code-issues" className="animate-fade-in">
          <div className="space-y-6">
            {results.codeExamples.html.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">HTML Issues</h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.codeExamples.html.map((example, index) => (
                    <CodeBlock
                      key={`html-${index}`}
                      title={`HTML Issue ${index + 1}`}
                      code={example.code}
                      language="html"
                      issue={example.issue}
                      suggestion={example.suggestion}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {results.codeExamples.css.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">CSS Issues</h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.codeExamples.css.map((example, index) => (
                    <CodeBlock
                      key={`css-${index}`}
                      title={`CSS Issue ${index + 1}`}
                      code={example.code}
                      language="css"
                      issue={example.issue}
                      suggestion={example.suggestion}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {results.codeExamples.js.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">JavaScript Issues</h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.codeExamples.js.map((example, index) => (
                    <CodeBlock
                      key={`js-${index}`}
                      title={`JavaScript Issue ${index + 1}`}
                      code={example.code}
                      language="js"
                      issue={example.issue}
                      suggestion={example.suggestion}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="animate-fade-in">
          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Detailed Report</h3>
            <p className="text-muted-foreground mb-4">
              The detailed report feature will provide in-depth analysis on each aspect of your portfolio website.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisResults;
