import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CirclePlus, Search, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import heroBanner from '@/assets/hero-banner.png';
import { StatusBadge } from '@/components/ui/status-badge';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-header text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Secure Your Valuables with ItemRegistry
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Register your items and help prevent the purchase of stolen goods. Protect your belongings and check before you buy.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="gap-2">
                        <CirclePlus size={20} />
                        Register Item
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                        <Search size={20} />
                        Search Registry
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button size="lg" className="gap-2">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                        <Search size={20} />
                        Search Registry
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={heroBanner} 
                alt="Item Registry Interface" 
                className="rounded-lg shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <CirclePlus className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Register Your Items</h3>
              <p className="text-muted-foreground">
                Add your valuable items with serial numbers to create a secure record in our registry.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-destructive/10 w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck className="text-destructive h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Mark if Stolen</h3>
              <p className="text-muted-foreground">
                Should the worst happen, easily update your item's status to notify potential buyers.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Verify Before Buying</h3>
              <p className="text-muted-foreground">
                Potential buyers can check serial numbers against our registry before purchasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Status indicators */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Understanding Item Status</h2>
          
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-card p-6 rounded-lg border">
              <StatusBadge status="safe" size="lg" className="mb-4" />
              <h3 className="font-medium mb-2">Not Stolen</h3>
              <p className="text-sm text-muted-foreground">
                The item is registered and has not been reported stolen.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <StatusBadge status="stolen" size="lg" className="mb-4" />
              <h3 className="font-medium mb-2">Stolen</h3>
              <p className="text-sm text-muted-foreground">
                The item has been reported as stolen by its registered owner.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <StatusBadge status="unknown" size="lg" className="mb-4" />
              <h3 className="font-medium mb-2">Unknown</h3>
              <p className="text-sm text-muted-foreground">
                The item is not found in our registry or status cannot be determined.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
