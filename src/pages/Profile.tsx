
import React, { useState } from "react";
import Header from "@/components/Header";
import ProfileSection from "@/components/ProfileSection";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Zap } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, description }) => (
  <Card className="p-6 bg-card/50 backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    <p className="text-3xl font-semibold mt-2">{value}</p>
    <p className="text-xs text-muted-foreground mt-2">{description}</p>
  </Card>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 container mx-auto px-4 sm:px-6 max-w-6xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ProfileSection className="animate-fade-in" />
          </div>
          
          <div className="lg:col-span-8">
            <Tabs 
              defaultValue="overview" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="animate-fade-in"
            >
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports">My Reports</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatsCard
                    title="Total Reports"
                    value="42"
                    icon={<FileText size={16} />}
                    description="Reports submitted in the last 12 months"
                  />
                  <StatsCard
                    title="Streak"
                    value="7 days"
                    icon={<Zap size={16} />}
                    description="Current report submission streak"
                  />
                  <StatsCard
                    title="This Month"
                    value="12"
                    icon={<Calendar size={16} />}
                    description="Reports submitted in May 2023"
                  />
                </div>
                
                <Card className="p-6 bg-card/50 backdrop-blur-sm">
                  <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm">You submitted <span className="font-medium">API Integration Complete</span></p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm">You submitted <span className="font-medium">Fixed Critical UI Bug</span></p>
                        <p className="text-xs text-muted-foreground">4 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm">You submitted <span className="font-medium">Completed User Authentication Flow</span></p>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card className="p-6 bg-card/50 backdrop-blur-sm h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Report Archive</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      View and manage all your submitted reports
                      <br />
                      (Not implemented in this demo)
                    </p>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card className="p-6 bg-card/50 backdrop-blur-sm h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Zap size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Reports Analytics</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      Visualize your reporting patterns and productivity trends
                      <br />
                      (Not implemented in this demo)
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
