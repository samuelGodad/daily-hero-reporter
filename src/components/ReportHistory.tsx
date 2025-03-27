
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  title: string;
  date: string;
  time: string;
  content: string;
}

interface ReportHistoryProps {
  className?: string;
}

const ReportHistory: React.FC<ReportHistoryProps> = ({ className }) => {
  // Sample data - in a real app, this would come from an API or state management
  const reports: Report[] = [
    {
      id: "1",
      title: "Completed User Authentication Flow",
      date: "May 15, 2023",
      time: "5:30 PM",
      content: "Implemented login, registration, and password reset functionality using Firebase Authentication."
    },
    {
      id: "2",
      title: "Fixed Critical UI Bug",
      date: "May 14, 2023",
      time: "4:45 PM",
      content: "Resolved issue with responsive layout breaking on tablet devices. Implemented proper media queries."
    },
    {
      id: "3",
      title: "API Integration Complete",
      date: "May 13, 2023",
      time: "5:15 PM",
      content: "Successfully integrated with payment gateway API. All transactions now process correctly."
    }
  ];

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
                <span>{report.date}</span>
                <Clock size={14} className="ml-4 mr-1" />
                <span>{report.time}</span>
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
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Report</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {report.content}
          </p>
          
          <Button variant="ghost" size="sm" className="mt-2 text-primary text-sm px-0">
            Read more
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ReportHistory;
