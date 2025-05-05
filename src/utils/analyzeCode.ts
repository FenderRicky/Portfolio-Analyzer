
// This is a simple mock of code analysis - in a real application, 
// you would integrate with tools like Lighthouse, ESLint, etc.

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

// Mock data and analysis functions
const mockHtmlIssues = [
  {
    code: `<div>
  <img src="profile.jpg" />
  <h1>John Doe</h1>
  <div class="social-links">
    <a href="#">Twitter</a>
    <a href="#">GitHub</a>
  </div>
</div>`,
    issue: "Missing alt attribute on image and missing semantic HTML structure.",
    suggestion: "Add descriptive alt text and use semantic elements like <header>, <main>, <footer>, etc."
  },
  {
    code: `<div class="project">
  <div class="project-img">
    <img src="project1.jpg" />
  </div>
  <div class="project-info">
    <h3>Project Title</h3>
    <p>Project description goes here...</p>
    <a href="project-link.html">View Project</a>
  </div>
</div>`,
    issue: "Missing alt attributes and non-descriptive link text.",
    suggestion: "Add alt text to images and make link text descriptive (e.g., 'View Project: Project Title')."
  }
];

const mockCssIssues = [
  {
    code: `.container {
  width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  position: fixed;
  width: 100%;
  height: 60px;
  background: #333;
  color: white;
}`,
    issue: "Fixed width container will cause horizontal scrolling on smaller screens.",
    suggestion: "Use max-width instead of fixed width, and add responsive breakpoints with media queries."
  },
  {
    code: `.project-card {
  float: left;
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}`,
    issue: "Using float for layout instead of modern techniques.",
    suggestion: "Replace float-based layouts with CSS Grid or Flexbox for better responsiveness and flexibility."
  }
];

const mockJsIssues = [
  {
    code: `function animateElements() {
  document.querySelectorAll('.animate').forEach(function(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}

window.onload = function() {
  animateElements();
  
  window.onscroll = function() {
    // More animations based on scroll
    if (window.scrollY > 100) {
      document.querySelector('header').classList.add('scrolled');
    } else {
      document.querySelector('header').classList.remove('scrolled');
    }
  };
};`,
    issue: "Using scroll events without debounce/throttle can cause performance issues.",
    suggestion: "Implement throttling for scroll events and use IntersectionObserver for element visibility."
  }
];

const mockSuggestions = [
  {
    id: "html-1",
    category: "HTML",
    title: "Improve Semantic Structure",
    description: "Replace generic div elements with semantic HTML5 elements like header, main, section, article, and footer to improve accessibility and SEO.",
    priority: "high"
  },
  {
    id: "html-2",
    category: "HTML",
    title: "Add Missing Alt Tags",
    description: "Add descriptive alt text to all images to improve accessibility for screen readers and SEO.",
    priority: "high"
  },
  {
    id: "html-3",
    category: "HTML",
    title: "Improve Meta Tags",
    description: "Add proper meta tags including description, viewport, and open graph tags for better SEO and social sharing.",
    priority: "medium"
  },
  {
    id: "css-1",
    category: "CSS",
    title: "Implement Responsive Design",
    description: "Replace fixed-width elements with responsive units and add media queries to ensure your portfolio looks great on all devices.",
    priority: "high"
  },
  {
    id: "css-2",
    category: "CSS",
    title: "Modernize Layout Techniques",
    description: "Replace outdated float-based layouts with CSS Grid and Flexbox for more flexible and maintainable layouts.",
    priority: "medium"
  },
  {
    id: "css-3",
    category: "CSS",
    title: "Optimize CSS Selectors",
    description: "Simplify and consolidate CSS selectors to improve style computation performance and reduce CSS file size.",
    priority: "low"
  },
  {
    id: "javascript-1",
    category: "JavaScript",
    title: "Optimize Event Handlers",
    description: "Implement debouncing and throttling for scroll and resize events to improve performance and reduce unnecessary calculations.",
    priority: "medium"
  },
  {
    id: "javascript-2",
    category: "JavaScript",
    title: "Update Library Versions",
    description: "Update jQuery and other libraries to their latest versions to benefit from performance improvements and security fixes.",
    priority: "high"
  },
  {
    id: "javascript-3",
    category: "JavaScript",
    title: "Implement Lazy Loading",
    description: "Implement lazy loading for images and videos to improve initial page load performance, especially for portfolio items.",
    priority: "medium"
  }
];

// This would be replaced with actual analysis in a production app
export const analyzeCode = async (inputType: string, inputValue: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("Analyzing:", inputType);
  
  // For URL inputs, we would use tools like Lighthouse or custom web scrapers
  // For now, we'll return mock data regardless of input
  
  // In a real app, this score would be calculated based on analysis
  const generateRandomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  return {
    scores: {
      performance: generateRandomScore(60, 85),
      seo: generateRandomScore(65, 90),
      accessibility: generateRandomScore(55, 80),
      bestPractices: generateRandomScore(70, 95)
    },
    codeExamples: {
      html: mockHtmlIssues,
      css: mockCssIssues,
      js: mockJsIssues
    },
    suggestions: mockSuggestions
  };
};
