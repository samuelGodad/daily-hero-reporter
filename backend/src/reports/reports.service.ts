
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto, userId: string): Promise<Report> {
    const report = this.reportsRepository.create({
      ...createReportDto,
      userId,
    });

    return this.reportsRepository.save(report);
  }

  async findAll(userId: string): Promise<Report[]> {
    return this.reportsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Report> {
    const report = await this.reportsRepository.findOne({ where: { id } });
    
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    
    if (report.userId !== userId) {
      throw new ForbiddenException('You do not have permission to access this report');
    }
    
    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto, userId: string): Promise<Report> {
    const report = await this.findOne(id, userId);
    
    Object.assign(report, updateReportDto);
    return this.reportsRepository.save(report);
  }

  async remove(id: string, userId: string): Promise<void> {
    const report = await this.findOne(id, userId);
    
    await this.reportsRepository.remove(report);
  }
}
