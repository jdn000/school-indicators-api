import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

import { AlumnService } from 'src/alumn/alumn.service';
import { SemesterService } from 'src/semester/semester.service';


@Module({
  controllers: [ReportController],
  providers: [ReportService, AlumnService, SemesterService],
  imports: [AlumnService]
})
export class ReportModule { }
