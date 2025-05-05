
import React from 'react';
import { Code, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 md:py-10">
      <div className="container flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg mb-4">
          <Code className="w-6 h-6 text-primary mr-2" />
          <Search className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Portfolio Code Analyzer & Optimizer</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">
          Benchmark your portfolio against elite websites with AI-powered analysis and actionable improvements.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Semantic HTML
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
            CSS Analysis
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
            JavaScript Optimization
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
            SEO Insights
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
            Performance Tuning
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
