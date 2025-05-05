
import React, { useState } from 'react';
import Header from '@/components/Header';
import CodeInputForm from '@/components/CodeInputForm';
import AnalysisResults from '@/components/AnalysisResults';
import AutomatedFixes from '@/components/AutomatedFixes';
import { analyzeCode } from '@/utils/analyzeCode';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

// Mock automated fixes data - would come from actual analysis in a real application
const mockFixes = [
  {
    id: "fix-1",
    title: "Add Alt Tags to Images",
    description: "Automatically add descriptive alt tags to all images based on context.",
    impact: "Improves accessibility score by ~15%",
  },
  {
    id: "fix-2",
    title: "Convert Images to WebP",
    description: "Convert all PNG and JPEG images to WebP format for better compression.",
    impact: "Reduces page load time by up to 30%",
  },
  {
    id: "fix-3",
    title: "Add Meta Tags",
    description: "Generate and add proper meta tags for better SEO.",
    impact: "Improves SEO score by ~20%",
    codeSnippet: `<meta name="description" content="Your portfolio description">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="View my work and projects">
<meta property="og:image" content="https://yourdomain.com/preview.jpg">`,
  },
  {
    id: "fix-4",
    title: "Add Semantic Structure",
    description: "Replace generic div containers with semantic HTML elements.",
    impact: "Improves accessibility and SEO scores",
    codeSnippet: `<!-- Before -->
<div class="header">...</div>

<!-- After -->
<header>...</header>`,
  },
];

// Template code snippets that users can adopt
const templateSnippets = [
  {
    id: "template-1",
    title: "Google-style Project Card",
    description: "A clean, modern project card layout inspired by Google's Material Design.",
    impact: "Improves visual hierarchy and user engagement",
    codeSnippet: `<article class="project-card">
  <div class="project-image">
    <img src="project.jpg" alt="Project description" loading="lazy">
  </div>
  <div class="project-content">
    <h3 class="project-title">Project Name</h3>
    <p class="project-description">Brief description of the project and your role.</p>
    <div class="project-metrics">
      <span class="metric">+20% Conversion</span>
      <span class="metric">100K+ Users</span>
    </div>
    <a href="#" class="project-link">View Case Study</a>
  </div>
</article>`,
  },
  {
    id: "template-2",
    title: "Modern Contact Section",
    description: "A responsive contact section with modern styling.",
    impact: "Increases contact form submissions",
    codeSnippet: `<section class="contact" id="contact">
  <h2 class="section-title">Let's Connect</h2>
  <div class="contact-container">
    <div class="contact-info">
      <h3>Get in touch</h3>
      <p>Interested in working together? Feel free to reach out.</p>
      <ul class="contact-methods">
        <li><a href="mailto:you@example.com">you@example.com</a></li>
        <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
      </ul>
    </div>
    <form class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" rows="5" required></textarea>
      </div>
      <button type="submit" class="submit-btn">Send Message</button>
    </form>
  </div>
</section>`,
  },
];

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
          <>
            <section className="mb-12">
              <AnalysisResults results={results} />
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-12">
              <Tabs defaultValue="fixes" className="w-full">
                <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
                  <TabsTrigger value="fixes">Automated Fixes</TabsTrigger>
                  <TabsTrigger value="templates">Elite Templates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="fixes" className="animate-fade-in">
                  <AutomatedFixes fixes={mockFixes} />
                </TabsContent>
                
                <TabsContent value="templates" className="animate-fade-in">
                  <AutomatedFixes fixes={templateSnippets} />
                </TabsContent>
              </Tabs>
            </section>
          </>
        )}
        
        <footer className="text-center text-sm text-muted-foreground py-6">
          <p>Portfolio Code Analyzer & Optimizer - Benchmark your site against elite portfolios</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
