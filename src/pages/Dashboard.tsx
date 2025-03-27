
import React from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import ReportService from "@/services/reports";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { format, subDays } from "date-fns";
import { Loader2, CalendarDays, FileText, Award } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Fetch user reports
  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: ReportService.getReports,
  });

  // Mock data for charts
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), i);
    return {
      date: format(date, 'MMM dd'),
      reports: Math.floor(Math.random() * 3),
    };
  }).reverse();

  const reportCategories = [
    { name: 'Feature Development', value: 42 },
    { name: 'Bug Fixes', value: 28 },
    { name: 'Code Review', value: 15 },
    { name: 'Meetings', value: 10 },
    { name: 'Documentation', value: 5 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 pt-24 container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center items-center h-80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  const recentReportsCount = reports?.length || 0;
  const streakCount = 7; // Mock streak count
  const totalReportsCount = 42; // Mock total reports count

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 container mx-auto px-4 max-w-7xl pb-16">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Reports</p>
                <h3 className="text-3xl font-bold mt-2">{recentReportsCount}</h3>
                <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <h3 className="text-3xl font-bold mt-2">{streakCount} days</h3>
                <p className="text-sm text-muted-foreground mt-1">Keep it going!</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <h3 className="text-3xl font-bold mt-2">{totalReportsCount}</h3>
                <p className="text-sm text-muted-foreground mt-1">All time</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-6">Daily Report Activity</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={last30Days}
                  margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    name="Reports"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-6">Report Categories</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reportCategories}
                  margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis 
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Reports"
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-4">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border/40 rounded-md p-4">
              <p className="text-sm font-medium text-muted-foreground">Most Productive Day</p>
              <p className="text-xl font-semibold mt-2">Wednesday</p>
            </div>
            <div className="border border-border/40 rounded-md p-4">
              <p className="text-sm font-medium text-muted-foreground">Average Reports/Week</p>
              <p className="text-xl font-semibold mt-2">3.5</p>
            </div>
            <div className="border border-border/40 rounded-md p-4">
              <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
              <p className="text-xl font-semibold mt-2">14 days</p>
            </div>
            <div className="border border-border/40 rounded-md p-4">
              <p className="text-sm font-medium text-muted-foreground">Current Month</p>
              <p className="text-xl font-semibold mt-2">12 reports</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
