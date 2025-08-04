import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CirclePlus, Search, ShieldCheck, Check, Star } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gradient-header text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
                <ShieldCheck size={16} className="mr-2" />
                Trusted Item Registry Platform test
              </div>
              
              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Choose To
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Be Safe
                </span>
                <span className="block text-4xl md:text-5xl font-medium mt-2 opacity-90">
                  with Catcher
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Begin protecting your belongings for just ₦5,000 per item and help prevent the purchase of stolen goods. 
                <span className="block mt-2 text-lg md:text-xl opacity-80">
                  Register your items and check before you buy.
                </span>
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-6 justify-center pt-4">
                {user ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="gap-3 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <CirclePlus size={24} />
                        Register Item
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button size="lg" variant="outline" className="gap-3 px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <Search size={24} />
                        Search Registry
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button size="lg" className="gap-3 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button size="lg" variant="outline" className="gap-3 px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <Search size={24} />
                        Search Registry
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm opacity-70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Secure & Encrypted
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  Real-time Updates
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  Community Driven
                </div>
              </div>
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

      {/* Pricing section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that works best for you. Secure your items with our affordable registry service.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Individual Plan */}
            <Card className="relative border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Individual Plan</CardTitle>
                <CardDescription className="text-base mt-2">
                  Perfect for personal use and small collections
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold">₦5,000</span>
                  <span className="text-muted-foreground text-lg ml-2">per item</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Secure item registration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Real-time status updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Public registry verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Theft reporting system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>24/7 registry access</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  {user ? (
                    <Link to="/register" className="block">
                      <Button className="w-full" size="lg">
                        Register Item Now
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" className="block">
                      <Button className="w-full" size="lg">
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Corporate Plan */}
            <Card className="relative border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Popular
                </div>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Corporate Plan</CardTitle>
                <CardDescription className="text-base mt-2">
                  Tailored solutions for businesses and organizations
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="text-muted-foreground text-lg ml-2">pricing</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Everything in Individual Plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Bulk item registration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Advanced analytics & reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>API access & integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>Priority support</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <ContactForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
