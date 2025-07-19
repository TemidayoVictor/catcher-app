import { useState, useEffect } from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { Menu, X, CirclePlus, Search, ListChecks, User, LogOut } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  
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
            <img src="https://i.ibb.co/JjTkKpM/logo.png" alt="Catcher Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl text-primary">Catcher</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
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
                
                <div className="ml-4 flex items-center space-x-2">
                  <ModeToggle />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback>
                            {user.user_metadata?.display_name?.[0] || user.email?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem className="flex-col items-start">
                        <div className="font-medium">
                          {user.user_metadata?.display_name || 'User'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <ModeToggle />
                <NavLink to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user.user_metadata?.display_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex-col items-start">
                    <div className="font-medium">
                      {user.user_metadata?.display_name || 'User'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
          {user ? (
            <>
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
            </>
          ) : (
            <div className="px-3 py-2">
              <NavLink to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}