
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreCard from './ScoreCard';
import CodeBlock from './CodeBlock';
import SuggestionsList from './SuggestionsList';
import { Button } from "@/components/ui/button";
import GradeDisplay from './GradeDisplay';
import BenchmarkComparison from './BenchmarkComparison';
import { Download } from 'lucide-react';

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

// Mock elite benchmark data - would come from actual data in a real application
const eliteBenchmarks = {
  performance: {
    average: 95,
    recommendations: [
      "Lazy-load images that appear below the fold",
      "Convert PNG images to WebP format",
      "Use HTTP/2 to reduce request overhead"
    ]
  },
  seo: {
    average: 92,
    recommendations: [
      "Add missing og:image meta tags",
      "Ensure all pages have unique title and meta descriptions",
      "Include structured data markup for richer search results"
    ]
  },
  accessibility: {
    average: 90,
    recommendations: [
      "Improve color contrast ratios to meet WCAG AA standards",
      "Add ARIA labels to all interactive elements",
      "Ensure proper heading hierarchy for screen readers"
    ]
  },
  bestPractices: {
    average: 94,
    recommendations: [
      "Update outdated libraries to their latest versions",
      "Implement proper error handling for all fetch requests",
      "Use semantic HTML elements instead of generic divs"
    ]
  }
};

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <ScoreCard 
            title="Performance" 
            score={results.scores.performance} 
            description="Speed, responsiveness, and resource efficiency"
            category="performance"
          />
          <div className="absolute top-2 right-2">
            <GradeDisplay score={results.scores.performance} />
          </div>
        </div>
        <div className="relative">
          <ScoreCard 
            title="SEO" 
            score={results.scores.seo} 
            description="Search engine optimization and findability"
            category="seo"
          />
          <div className="absolute top-2 right-2">
            <GradeDisplay score={results.scores.seo} />
          </div>
        </div>
        <div className="relative">
          <ScoreCard 
            title="Accessibility" 
            score={results.scores.accessibility} 
            description="Usability for all users including those with disabilities"
            category="accessibility"
          />
          <div className="absolute top-2 right-2">
            <GradeDisplay score={results.scores.accessibility} />
          </div>
        </div>
        <div className="relative">
          <ScoreCard 
            title="Best Practices" 
            score={results.scores.bestPractices} 
            description="Modern development standards and techniques"
            category="bestPractices"
          />
          <div className="absolute top-2 right-2">
            <GradeDisplay score={results.scores.bestPractices} />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="benchmarks">Elite Benchmarks</TabsTrigger>
          <TabsTrigger value="code-issues">Code Issues</TabsTrigger>
          <TabsTrigger value="details">Detailed Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestions" className="animate-fade-in">
          <SuggestionsList suggestions={results.suggestions} />
          
          <div className="flex justify-center mt-8">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download Full Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="benchmarks" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenchmarkComparison 
              category="Performance"
              userScore={results.scores.performance}
              eliteAverage={eliteBenchmarks.performance.average}
              recommendations={eliteBenchmarks.performance.recommendations}
            />
            <BenchmarkComparison 
              category="SEO"
              userScore={results.scores.seo}
              eliteAverage={eliteBenchmarks.seo.average}
              recommendations={eliteBenchmarks.seo.recommendations}
            />
            <BenchmarkComparison 
              category="Accessibility"
              userScore={results.scores.accessibility}
              eliteAverage={eliteBenchmarks.accessibility.average}
              recommendations={eliteBenchmarks.accessibility.recommendations}
            />
            <BenchmarkComparison 
              category="Best Practices"
              userScore={results.scores.bestPractices}
              eliteAverage={eliteBenchmarks.bestPractices.average}
              recommendations={eliteBenchmarks.bestPractices.recommendations}
            />
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
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Detailed Analysis Report</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Performance Insights</h4>
                  <p className="text-muted-foreground">
                    Your portfolio loads in approximately 2.1 seconds on average broadband connections.
                    Top portfolios load in 0.8 seconds, making your site 1.3 seconds slower.
                    This places you in the bottom 30% of analyzed portfolios for load performance.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Elite Comparisons</h4>
                  <p className="text-muted-foreground">
                    When comparing to top-tier portfolios from Google, Apple, and Adobe designers:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>93% use properly sized and optimized images (WebP format)</li>
                    <li>87% implement proper semantic HTML structure</li>
                    <li>91% have a mobile-first responsive design</li>
                    <li>89% use modern CSS Grid/Flexbox layouts</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Key Improvement Areas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium">Critical Fixes</h5>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                        <li>Convert images to WebP format (potential 30% size reduction)</li>
                        <li>Add missing alt tags to 6 images</li>
                        <li>Fix color contrast issues in header navigation</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium">Enhancement Opportunities</h5>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                        <li>Add project metrics to showcase impact</li>
                        <li>Improve meta descriptions for better SEO</li>
                        <li>Modernize CSS with Flexbox/Grid layouts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Download Full Report
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisResults;
