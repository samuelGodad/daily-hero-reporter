
import api from './api';
import { toast } from 'sonner';

export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
}

export interface CreateReportDto {
  title: string;
  content: string;
}

const ReportService = {
  async getReports(): Promise<Report[]> {
    try {
      const response = await api.get<Report[]>('/reports');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch reports');
      return [];
    }
  },
  
  async getReportById(id: string): Promise<Report | null> {
    try {
      const response = await api.get<Report>(`/reports/${id}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch report details');
      return null;
    }
  },
  
  async createReport(report: CreateReportDto): Promise<Report | null> {
    try {
      const response = await api.post<Report>('/reports', report);
      toast.success('Report submitted successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to submit report');
      return null;
    }
  },
  
  async updateReport(id: string, report: Partial<CreateReportDto>): Promise<Report | null> {
    try {
      const response = await api.patch<Report>(`/reports/${id}`, report);
      toast.success('Report updated successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to update report');
      return null;
    }
  },
  
  async deleteReport(id: string): Promise<boolean> {
    try {
      await api.delete(`/reports/${id}`);
      toast.success('Report deleted successfully');
      return true;
    } catch (error) {
      toast.error('Failed to delete report');
      return false;
    }
  }
};

export default ReportService;
