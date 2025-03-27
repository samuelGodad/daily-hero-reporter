
import React from "react";
import Header from "@/components/Header";
import ReportForm from "@/components/ReportForm";
import ReportHistory from "@/components/ReportHistory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReportService from "@/services/reports";
import { toast } from "sonner";

const Reports = () => {
  const queryClient = useQueryClient();
  
  // Fetch reports
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: ReportService.getReports
  });
  
  // Delete report mutation
  const deleteReportMutation = useMutation({
    mutationFn: (id: string) => ReportService.deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    }
  });
  
  // Handle delete report
  const handleDeleteReport = (id: string) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      deleteReportMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 container mx-auto px-4 sm:px-6 max-w-6xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold mb-6 animate-fade-in">Daily Report Dashboard</h1>
            <ReportForm 
              className="animate-slide-up" 
              onSuccess={() => {
                toast.success("Report submitted successfully");
              }}
            />
          </div>
          
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <ReportHistory 
                className="animate-slide-up" 
                reports={reports}
                isLoading={isLoading}
                onDelete={handleDeleteReport}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
