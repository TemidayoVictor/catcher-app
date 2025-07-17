import { useState, useEffect } from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { Menu, X, CirclePlus, Search, ListChecks } from "lucide-react";
import logo from "@/assets/logo.png";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Register Item", path: "/register", icon: <CirclePlus className="h-4 w-4" /> },
    { name: "Search", path: "/search", icon: <Search className="h-4 w-4" /> },
    { name: "My Items", path: "/my-items", icon: <ListChecks className="h-4 w-4" /> },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-30 transition-all duration-300 ${
        scrolled 
          ? "bg-background/90 backdrop-blur-md shadow-md" 
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="ItemRegistry Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl text-primary">ItemRegistry</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
            
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-foreground"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-background border-t`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}