
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { Search } from 'lucide-react';

interface CodeInputFormProps {
  onSubmit: (inputType: string, inputValue: string) => void;
  isAnalyzing: boolean;
}

const CodeInputForm = ({ onSubmit, isAnalyzing }: CodeInputFormProps) => {
  const [activeTab, setActiveTab] = useState<string>("url");
  const [urlInput, setUrlInput] = useState<string>("");
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "url") {
      if (!urlInput || !urlInput.trim()) {
        toast.error("Please enter a valid URL");
        return;
      }
      
      // Basic URL validation
      try {
        new URL(urlInput);
        onSubmit("url", urlInput);
      } catch (e) {
        toast.error("Please enter a valid URL with http:// or https://");
      }
    } else {
      if (!htmlCode && !cssCode && !jsCode) {
        toast.error("Please enter some code to analyze");
        return;
      }
      const codeInput = {
        html: htmlCode,
        css: cssCode,
        js: jsCode
      };
      onSubmit("code", JSON.stringify(codeInput));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6">
      <Tabs defaultValue="url" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="url">Analyze URL</TabsTrigger>
          <TabsTrigger value="code">Paste Code</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="url">
            <div className="space-y-4">
              <div>
                <label htmlFor="url-input" className="text-sm font-medium block mb-2">
                  Portfolio Website URL
                </label>
                <div className="flex">
                  <Input 
                    id="url-input"
                    placeholder="https://your-portfolio.com" 
                    value={urlInput} 
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Enter the URL of the portfolio website you want to analyze
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-6">
            <div>
              <label htmlFor="html-code" className="text-sm font-medium block mb-2">
                HTML Code
              </label>
              <Textarea 
                id="html-code"
                placeholder="Paste your HTML code here"
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="font-mono min-h-[150px]"
              />
            </div>
            
            <div>
              <label htmlFor="css-code" className="text-sm font-medium block mb-2">
                CSS Code
              </label>
              <Textarea 
                id="css-code"
                placeholder="Paste your CSS code here"
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="font-mono min-h-[150px]"
              />
            </div>
            
            <div>
              <label htmlFor="js-code" className="text-sm font-medium block mb-2">
                JavaScript Code
              </label>
              <Textarea 
                id="js-code"
                placeholder="Paste your JavaScript code here"
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="font-mono min-h-[150px]"
              />
            </div>
          </TabsContent>
          
          <div className="flex justify-center mt-6">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isAnalyzing}
              className="w-full sm:w-auto gap-2"
            >
              <Search className="w-4 h-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze Portfolio"}
            </Button>
          </div>
        </form>
      </Tabs>
    </Card>
  );
};

export default CodeInputForm;
