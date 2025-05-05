
import React, { useState } from 'react';
import Header from '@/components/Header';
import CodeInputForm from '@/components/CodeInputForm';
import AnalysisResults from '@/components/AnalysisResults';
import { analyzeCode } from '@/utils/analyzeCode';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (inputType: string, inputValue: string) => {
    try {
      setIsAnalyzing(true);
      toast.info("Analyzing your portfolio...");
      
      const analysisResults = await analyzeCode(inputType, inputValue);
      setResults(analysisResults);
      
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 mx-auto">
        <Header />
        
        <Separator className="my-8" />
        
        <section className="mb-12">
          <CodeInputForm onSubmit={handleSubmit} isAnalyzing={isAnalyzing} />
        </section>
        
        {results && (
          <section className="mb-12">
            <AnalysisResults results={results} />
          </section>
        )}
        
        <footer className="text-center text-sm text-muted-foreground py-6">
          <p>Code Canvas Critique - Analyze and improve your portfolio website</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
