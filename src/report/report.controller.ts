import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { promisify } from 'util';
import { AlumnService } from 'src/alumn/alumn.service';

import { SemesterService } from 'src/semester/semester.service';


@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly alumnService: AlumnService,
    private readonly semesterService: SemesterService
  ) { }

  @Post('/:gradeNumber')
  async getAll(@Param('gradeNumber') gradeNumber: number): Promise<any> {
    const alumnsData = await this.alumnService.getAllData(gradeNumber);
    const sem = await this.semesterService.getCurrentSemester();
    let isFirstSemester = false;
    if (sem.code % 2 === 0) {
      isFirstSemester = true;
      return this.reportService.test(alumnsData, isFirstSemester);
    }
  }

  @Get('/:id/download')
  // @UseBefore(celebrate(report.get))
  async downloadLabReport(@Param('id') id: number, response: Response): Promise<Response> {
    const { path } = await this.reportService.getById(id);
    await promisify<string, void>(response.download.bind(response))(path);
    this.reportService.deleteReportAfterDownload(path);
    return response;
  }

  @Get('/alumn/:id')
  async getByAlumnId(@Param('id') id: number): Promise<any> {
    const alumnsData = await this.alumnService.getAlumnData(id);
    const sem = await this.semesterService.getCurrentSemester();
    let isFirstSemester = false;
    if (sem.code % 2 === 0) {
      isFirstSemester = true;
    }
    return this.reportService.test([alumnsData], isFirstSemester);
  }
}
