
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
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
        <span 
          className="font-semibold text-lg animate-fade-in cursor-pointer" 
          onClick={() => navigate("/")}
        >
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
        
        {isAuthenticated && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full px-4 transition-all duration-300",
                isActive("/dashboard") && "bg-accent text-foreground"
              )}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
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
          </>
        )}
        
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
        
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full ml-2 flex items-center gap-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xs">
                    {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">{user?.name?.split(" ")[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User size={16} className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => logout()}>
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/login")}
            className="ml-2"
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
