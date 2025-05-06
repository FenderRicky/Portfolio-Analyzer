
// This is a simple implementation for code analysis
// In a production app, you'd integrate with more sophisticated tools

interface CodeInput {
  html?: string;
  css?: string;
  js?: string;
}

interface AnalysisResult {
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
}

// Helper function to extract basic metrics from code
const extractMetrics = (code: string, type: 'html' | 'css' | 'js') => {
  if (!code) return { score: 0, issues: [] };
  
  let score = 70; // Base score
  const issues = [];
  
  if (type === 'html') {
    // Check for semantic HTML
    if (!/<(header|main|footer|section|article|nav|aside)/i.test(code)) {
      issues.push({
        code: code.slice(0, 200) + (code.length > 200 ? '...' : ''),
        issue: "Missing semantic HTML structure",
        suggestion: "Use semantic elements like <header>, <main>, <footer>, etc."
      });
      score -= 10;
    }
    
    // Check for alt attributes on images
    if (/<img[^>]+(?!alt=)[^>]*>/i.test(code)) {
      issues.push({
        code: code.match(/<img[^>]+(?!alt=)[^>]*>/i)?.[0] || "",
        issue: "Missing alt attributes on images",
        suggestion: "Add descriptive alt text to all images"
      });
      score -= 10;
    }
    
    // Check for meta tags
    if (!/<meta name="description"/i.test(code)) {
      issues.push({
        code: "<head>...</head>",
        issue: "Missing meta description tag",
        suggestion: "Add a meta description tag for better SEO"
      });
      score -= 5;
    }
  }
  
  if (type === 'css') {
    // Check for responsiveness
    if (!/@media/i.test(code)) {
      issues.push({
        code: code.slice(0, 200) + (code.length > 200 ? '...' : ''),
        issue: "No responsive design with media queries",
        suggestion: "Add media queries for different screen sizes"
      });
      score -= 15;
    }
    
    // Check for excessive selectors
    const longSelectors = (code.match(/[.#][^\s,{]+(?=\s*\{)/g) || [])
      .filter(selector => selector.split(' ').length > 3);
      
    if (longSelectors.length > 0) {
      issues.push({
        code: longSelectors.slice(0, 2).join('\n'),
        issue: "Complex CSS selectors can slow rendering",
        suggestion: "Simplify your CSS selectors and reduce specificity"
      });
      score -= 5;
    }
  }
  
  if (type === 'js') {
    // Check for addEventListener without cleanup
    if (/addEventListener/i.test(code) && !/removeEventListener/i.test(code)) {
      issues.push({
        code: code.match(/[^\n]*addEventListener[^\n]*/i)?.[0] || "",
        issue: "Event listeners without cleanup can cause memory leaks",
        suggestion: "Remove event listeners when they're no longer needed"
      });
      score -= 10;
    }
    
    // Check for console.log statements
    if (/console\.log/i.test(code)) {
      issues.push({
        code: code.match(/[^\n]*console\.log[^\n]*/i)?.[0] || "",
        issue: "Console logs should be removed in production code",
        suggestion: "Remove or replace console.log with proper error handling"
      });
      score -= 5;
    }
  }
  
  return {
    score: Math.max(0, Math.min(100, score)),
    issues
  };
};

export const analyzeCode = async (inputType: string, inputValue: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log("Analyzing:", inputType);
  
  let htmlCode = "";
  let cssCode = "";
  let jsCode = "";
  
  // Parse the input based on type
  if (inputType === "url") {
    // In a real app, we would fetch the URL's content
    // For this demo, we'll just add a mock example for URL input
    htmlCode = `<div class="container">
  <img src="profile.jpg">
  <div class="header">
    <h1>John Doe - Portfolio</h1>
  </div>
  <div class="projects">
    <div class="project">Project 1</div>
  </div>
</div>`;
  } else if (inputType === "code") {
    try {
      const parsedCode = JSON.parse(inputValue);
      htmlCode = parsedCode.html || "";
      cssCode = parsedCode.css || "";
      jsCode = parsedCode.js || "";
    } catch (error) {
      console.error("Failed to parse code input:", error);
      htmlCode = inputValue; // Assume it's just HTML if parsing fails
    }
  }
  
  // Analyze each code type
  const htmlAnalysis = extractMetrics(htmlCode, 'html');
  const cssAnalysis = extractMetrics(cssCode, 'css');
  const jsAnalysis = extractMetrics(jsCode, 'js');
  
  // Generate overall scores
  const performanceScore = Math.round((cssAnalysis.score * 0.4) + (jsAnalysis.score * 0.6));
  const seoScore = Math.round((htmlAnalysis.score * 0.7) + (cssAnalysis.score * 0.3));
  const accessibilityScore = Math.round((htmlAnalysis.score * 0.8) + (cssAnalysis.score * 0.2));
  const bestPracticesScore = Math.round(
    (htmlAnalysis.score * 0.4) + (cssAnalysis.score * 0.3) + (jsAnalysis.score * 0.3)
  );
  
  // Generate suggestions based on issues found
  const suggestions = [
    ...htmlAnalysis.issues.map((issue, idx) => ({
      id: `html-${idx}`,
      category: "HTML",
      title: issue.issue,
      description: issue.suggestion || "",
      priority: "high" as const
    })),
    ...cssAnalysis.issues.map((issue, idx) => ({
      id: `css-${idx}`,
      category: "CSS",
      title: issue.issue,
      description: issue.suggestion || "",
      priority: "medium" as const
    })),
    ...jsAnalysis.issues.map((issue, idx) => ({
      id: `js-${idx}`,
      category: "JavaScript",
      title: issue.issue,
      description: issue.suggestion || "",
      priority: "low" as const
    }))
  ];
  
  // If no issues were found, add some general suggestions
  if (suggestions.length === 0) {
    suggestions.push({
      id: "general-1",
      category: "General",
      title: "Add more content to analyze",
      description: "For a more detailed analysis, provide more code or a complete URL.",
      priority: "medium" as const
    });
  }
  
  return {
    scores: {
      performance: performanceScore,
      seo: seoScore,
      accessibility: accessibilityScore,
      bestPractices: bestPracticesScore
    },
    codeExamples: {
      html: htmlAnalysis.issues,
      css: cssAnalysis.issues,
      js: jsAnalysis.issues
    },
    suggestions: suggestions
  };
};
