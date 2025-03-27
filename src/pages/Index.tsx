
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Send, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add entrance animations
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slide-up', 'opacity-100');
        el.classList.remove('opacity-0', 'translate-y-4');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 opacity-0 translate-y-4 animate-on-mount">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                Daily reporting
                <br />
                <span className="text-primary">made simple</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Track your team's progress with streamlined daily reports that integrate seamlessly with WhatsApp.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                size="lg" 
                className="gap-2 bg-primary text-white hover:bg-primary/90 rounded-full px-6"
                onClick={() => navigate("/reports")}
              >
                Create Report <ArrowRight size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 rounded-full px-6"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
          
          <div className="glass-panel rounded-3xl p-8 opacity-0 translate-y-4 animate-on-mount">
            <div className="space-y-6">
              <h2 className="text-2xl font-medium">Why Daily Reports Matter</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Track Progress</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Monitor individual and team progress on projects in real-time.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Team Transparency</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Foster clear communication and visibility across all team members.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Send size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp Integration</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Submit reports directly through WhatsApp for maximum convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DailyHero Reporter. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-link">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-link">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground animated-link">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
