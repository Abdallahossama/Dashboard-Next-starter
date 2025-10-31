"use client";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";

export function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes, isDark, toggleDarkMode } =
    useTheme();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentTheme.name}
        onValueChange={(value) => {
          const theme = availableThemes.find((t) => t.name === value);
          if (theme) setTheme(theme);
        }}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
