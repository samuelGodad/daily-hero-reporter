
import React from "react";
import Header from "@/components/Header";
import ReportForm from "@/components/ReportForm";
import ReportHistory from "@/components/ReportHistory";

const Reports = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 container mx-auto px-4 sm:px-6 max-w-6xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold mb-6 animate-fade-in">Daily Report Dashboard</h1>
            <ReportForm className="animate-slide-up" />
          </div>
          
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <ReportHistory className="animate-slide-up" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
