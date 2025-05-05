
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  title: string;
  code: string;
  language: 'html' | 'css' | 'js';
  issue?: string;
  suggestion?: string;
}

const CodeBlock = ({ title, code, language, issue, suggestion }: CodeBlockProps) => {
  // Very basic syntax highlighting
  const formatCode = (code: string, language: 'html' | 'css' | 'js') => {
    if (!code) return '';
    
    let formattedCode = code;
    
    if (language === 'html') {
      formattedCode = formattedCode
        .replace(/(&lt;[\/]?[a-zA-Z0-9]+)/g, '<span class="keyword">$1</span>')
        .replace(/(&gt;)/g, '<span class="keyword">$1</span>')
        .replace(/(class|id|style)="([^"]*)"/g, '<span class="function">$1</span>="<span class="string">$2</span>"');
    } else if (language === 'css') {
      formattedCode = formattedCode
        .replace(/([a-zA-Z-]+)(?=:)/g, '<span class="keyword">$1</span>')
        .replace(/(#[a-zA-Z0-9]+|rgba?\([^)]+\)|[0-9]+px|[0-9]+%|[0-9]+em|[0-9]+rem)/g, '<span class="string">$1</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
    } else if (language === 'js') {
      formattedCode = formattedCode
        .replace(/\b(function|return|var|let|const|if|else|for|while|try|catch)\b/g, '<span class="keyword">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>')
        .replace(/\b([a-zA-Z]+[a-zA-Z0-9]*)\(/g, '<span class="function">$1</span>(')
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    }
    
    return formattedCode;
  };
  
  const getLanguageLabel = (language: 'html' | 'css' | 'js') => {
    switch(language) {
      case 'html': return 'HTML';
      case 'css': return 'CSS';
      case 'js': return 'JavaScript';
    }
  };
  
  const getLanguageBadgeClass = (language: 'html' | 'css' | 'js') => {
    switch(language) {
      case 'html': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'css': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'js': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-md border", 
            getLanguageBadgeClass(language)
          )}>
            {getLanguageLabel(language)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="code-block rounded-md">
          <pre 
            dangerouslySetInnerHTML={{ 
              __html: formatCode(code, language) 
            }} 
          />
        </div>
        
        {issue && (
          <div className="bg-danger/10 border border-danger/20 rounded-md p-3">
            <div className="font-medium text-danger mb-1">Issue</div>
            <div className="text-sm">{issue}</div>
          </div>
        )}
        
        {suggestion && (
          <div className="bg-success/10 border border-success/20 rounded-md p-3">
            <div className="font-medium text-success mb-1">Suggestion</div>
            <div className="text-sm">{suggestion}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeBlock;
