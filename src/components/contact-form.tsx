import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Building } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent('Corporate Plan Inquiry');
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company}\n` +
        `Phone: ${formData.phone}\n\n` +
        `Message:\n${formData.message}`
      );
      
      window.location.href = `mailto:info@catcher.com.ng?subject=${subject}&body=${body}`;
      
      toast({
        title: "Email client opened",
        description: "Your default email client should open with the contact information filled in.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Contact Us
        </CardTitle>
        <CardDescription>
          Get in touch for a custom corporate solution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Input
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Textarea
              name="message"
              placeholder="Tell us about your requirements..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mt-2">
              <Mail className="h-4 w-4" />
              info@catcher.com.ng
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};