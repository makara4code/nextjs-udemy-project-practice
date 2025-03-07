"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useState, useEffect } from "react";

const themes = [
  {
    name: "System",
    value: "system",
  },
  {
    name: "Dark",
    value: "dark",
  },
  {
    name: "light",
    value: "light",
  },
];

export default function ThemeToggle() {
  const { theme: currentTheme, setTheme: setCurrentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {currentTheme === "system" ? (
            <SunMoon />
          ) : currentTheme === "dark" ? (
            <Moon />
          ) : (
            <Sun />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuCheckboxItem
            key={theme.value}
            checked={currentTheme === theme.value}
            onClick={() => setCurrentTheme(theme.value)}
          >
            {theme.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
