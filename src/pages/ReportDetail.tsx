
import React from "react";
import Header from "@/components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReportService from "@/services/reports";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Edit, Trash2, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: report, isLoading, error } = useQuery({
    queryKey: ['report', id],
    queryFn: () => {
      if (!id) throw new Error('Report ID is required');
      return ReportService.getReportById(id);
    },
    retry: 1
  });
  
  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this report?')) {
      const success = await ReportService.deleteReport(id);
      if (success) {
        navigate('/reports');
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 pt-24 container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center items-center h-80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }
  
  if (error || !report) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 pt-24 container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Report Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The report you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Button onClick={() => navigate('/reports')}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Reports
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 container mx-auto px-4 max-w-4xl pb-16">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/reports')}
            className="mr-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-semibold grow animate-fade-in">
            Report Details
          </h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/reports/${id}/edit`)}
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
        
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm animate-fade-in">
          <div className="p-6">
            <h2 className="text-2xl font-medium mb-2">{report.title}</h2>
            
            <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6">
              <div className="flex items-center mr-6 mb-2">
                <Calendar size={16} className="mr-2" />
                <span>{format(new Date(report.createdAt), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Clock size={16} className="mr-2" />
                <span>{format(new Date(report.createdAt), 'h:mm a')}</span>
              </div>
              <div className="flex items-center mb-2">
                <User size={16} className="mr-2" />
                <span>Alex Johnson</span>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="whitespace-pre-line">{report.content}</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ReportDetail;
