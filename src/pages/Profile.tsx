
import React, { useState } from "react";
import Header from "@/components/Header";
import ProfileSection from "@/components/ProfileSection";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import ReportService from "@/services/reports";

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
  const { user } = useAuth();
  
  // Get user reports
  const { data: reports = [] } = useQuery({
    queryKey: ['reports'],
    queryFn: ReportService.getReports
  });

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
                    value={reports.length.toString()}
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
                  {reports.length > 0 ? (
                    <div className="space-y-4">
                      {reports.slice(0, 3).map(report => (
                        <div key={report.id} className="flex items-start space-x-4">
                          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm">You submitted <span className="font-medium">{report.title}</span></p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No recent activity found.</p>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card className="p-6 bg-card/50 backdrop-blur-sm">
                  {reports.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-4">Your Report Archive</h3>
                      <div className="divide-y divide-border">
                        {reports.map((report) => (
                          <div key={report.id} className="py-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{report.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(report.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <FileText size={16} className="text-muted-foreground" />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                              {report.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium">No Reports Found</h3>
                      <p className="text-muted-foreground text-sm mt-2">
                        You haven't submitted any reports yet.
                      </p>
                    </div>
                  )}
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
                      (This feature will be implemented soon)
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
