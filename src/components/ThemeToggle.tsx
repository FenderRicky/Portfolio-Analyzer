
import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value)}>
      <ToggleGroupItem value="light" aria-label="Light mode">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light mode</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark mode</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeToggle;
