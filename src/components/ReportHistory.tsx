
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MoreHorizontal, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Report } from "@/services/reports";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface ReportHistoryProps {
  className?: string;
  reports: Report[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

const ReportHistory: React.FC<ReportHistoryProps> = ({
  className,
  reports,
  isLoading,
  onDelete,
  onView
}) => {
  const navigate = useNavigate();

  const handleViewReport = (id: string) => {
    if (onView) {
      onView(id);
    } else {
      navigate(`/reports/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <h2 className="text-2xl font-medium mb-6">Recent Reports</h2>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className={`${className}`}>
        <h2 className="text-2xl font-medium mb-6">Recent Reports</h2>
        <Card className="p-8 bg-card/50 backdrop-blur-sm text-center">
          <p className="text-muted-foreground">No reports found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/reports')}
          >
            Create your first report
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-medium mb-4">Recent Reports</h2>
      
      {reports.map((report) => (
        <Card 
          key={report.id}
          className="p-5 bg-card/50 backdrop-blur-sm hover:shadow-soft transition-all duration-300 animate-fade-in"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{report.title}</h3>
              <div className="flex items-center mt-2 text-muted-foreground text-sm">
                <Calendar size={14} className="mr-1" />
                <span>{format(new Date(report.createdAt), 'MMM dd, yyyy')}</span>
                <Clock size={14} className="ml-4 mr-1" />
                <span>{format(new Date(report.createdAt), 'h:mm a')}</span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleViewReport(report.id)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/reports/${report.id}/edit`)}>
                  Edit Report
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => onDelete && onDelete(report.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {report.content}
          </p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-primary text-sm px-0"
            onClick={() => handleViewReport(report.id)}
          >
            Read more
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ReportHistory;
