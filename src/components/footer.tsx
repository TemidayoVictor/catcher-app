import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Shield, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              ItemRegistry
            </h3>
            <p className="text-sm text-muted-foreground">
              A secure platform to register your valuables and help prevent the purchase of stolen items.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register Item
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Search Registry
                </Link>
              </li>
              <li>
                <Link to="/my-items" className="text-muted-foreground hover:text-primary transition-colors">
                  My Items
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ItemRegistry. All rights reserved.</p>
          <p className="mt-1">This is a demo application. Items registered here are not stored permanently.</p>
        </div>
      </div>
    </footer>
  );
}