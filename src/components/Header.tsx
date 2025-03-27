
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme on component mount
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Check if the current route matches the provided path
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border/40",
        className
      )}
    >
      <div className="flex items-center space-x-1">
        <span className="font-semibold text-lg animate-fade-in">
          Daily<span className="text-primary">Hero</span>
        </span>
      </div>

      <nav className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full px-4 transition-all duration-300",
            isActive("/") && "bg-accent text-foreground"
          )}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full px-4 transition-all duration-300",
            isActive("/reports") && "bg-accent text-foreground"
          )}
          onClick={() => navigate("/reports")}
        >
          Reports
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full px-4 transition-all duration-300",
            isActive("/profile") && "bg-accent text-foreground"
          )}
          onClick={() => navigate("/profile")}
        >
          <User size={18} className="mr-1" />
          Profile
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="ml-2 rounded-full"
        >
          {theme === "light" ? (
            <Moon size={18} className="text-foreground/80" />
          ) : (
            <Sun size={18} className="text-foreground/80" />
          )}
        </Button>
      </nav>
    </header>
  );
};

export default Header;
