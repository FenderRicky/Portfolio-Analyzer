
import React from 'react';
import { Check } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 md:py-10">
      <div className="container flex flex-col items-center text-center">
        <div className="inline-block p-2 bg-primary/10 rounded-lg mb-4">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Code Canvas Critique</h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">
          Analyze and improve your portfolio website with actionable insights on HTML, CSS, and JavaScript.
        </p>
      </div>
    </header>
  );
};

export default Header;
