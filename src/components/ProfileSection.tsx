
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  LogOut,
  FileText,
  Mail,
  Phone,
  Building,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

interface ProfileSectionProps {
  className?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ className }) => {
  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Frontend Development",
    avatar: "", // Would be a URL in a real app
    reportsSubmitted: 42,
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, this would handle proper logout
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-2xl font-medium">{user.name}</h2>
              <p className="text-muted-foreground">{user.department}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center text-sm">
              <Mail size={16} className="mr-3 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone size={16} className="mr-3 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Building size={16} className="mr-3 text-muted-foreground" />
              <span>{user.department}</span>
            </div>
            <div className="flex items-center text-sm">
              <FileText size={16} className="mr-3 text-muted-foreground" />
              <span>{user.reportsSubmitted} Reports Submitted</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Account Settings</h3>
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-between text-left font-normal"
              onClick={() => toast.info("Settings not implemented in demo")}
            >
              <div className="flex items-center">
                <Settings size={16} className="mr-3" />
                <span>Edit Profile</span>
              </div>
              <ChevronRight size={16} />
            </Button>
            <Separator />
            <Button 
              variant="ghost" 
              className="w-full justify-between text-left font-normal"
              onClick={() => toast.info("Settings not implemented in demo")}
            >
              <div className="flex items-center">
                <Settings size={16} className="mr-3" />
                <span>Notification Settings</span>
              </div>
              <ChevronRight size={16} />
            </Button>
            <Separator />
            <Button 
              variant="ghost" 
              className="w-full justify-between text-left font-normal text-destructive hover:text-destructive/90"
              onClick={handleLogout}
            >
              <div className="flex items-center">
                <LogOut size={16} className="mr-3" />
                <span>Log Out</span>
              </div>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSection;
