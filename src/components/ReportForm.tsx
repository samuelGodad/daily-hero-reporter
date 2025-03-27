
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check, Send } from "lucide-react";

interface ReportFormProps {
  className?: string;
}

const ReportForm: React.FC<ReportFormProps> = ({ className }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Successful submission
      toast.success("Report submitted successfully");
      // Clear form
      setTitle("");
      setContent("");
      setSubmitting(false);
    }, 800);
  };

  return (
    <Card className={`overflow-hidden bg-card/50 backdrop-blur-sm ${className}`}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-1">Daily Report</h2>
          <p className="text-muted-foreground text-sm">
            Summarize your accomplishments for today
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Report Title
          </label>
          <Input
            id="title"
            placeholder="Brief summary of your day"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Accomplishments
          </label>
          <Textarea
            id="content"
            placeholder="Describe what you accomplished today..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[180px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 gap-2"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="animate-pulse">Submitting</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </>
            ) : (
              <>
                Submit Report
                <Send size={16} />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReportForm;
