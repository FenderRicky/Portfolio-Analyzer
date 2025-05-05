
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';

interface Suggestion {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const SuggestionsList = ({ suggestions }: SuggestionsListProps) => {
  // Group suggestions by category
  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, Suggestion[]>);
  
  const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
    switch(priority) {
      case 'high': return 'bg-danger/10 text-danger border-danger/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-info/10 text-info border-info/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'html':
        return (
          <div className="bg-orange-500/10 text-orange-500 p-1.5 rounded-md">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
        );
      case 'css':
        return (
          <div className="bg-blue-500/10 text-blue-500 p-1.5 rounded-md">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 7h.01M7 12h.01M7 17h.01M11 7h6M11 12h6M11 17h6" />
            </svg>
          </div>
        );
      case 'javascript':
        return (
          <div className="bg-yellow-500/10 text-yellow-500 p-1.5 rounded-md">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 18V6M7 10v4M17 14v-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-primary/10 text-primary p-1.5 rounded-md">
            <Check className="size-4" />
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              {getCategoryIcon(category)}
              <CardTitle className="text-lg font-medium">{category} Improvements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {categorySuggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityClass(suggestion.priority)}`}>
                    {suggestion.priority} priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestionsList;
