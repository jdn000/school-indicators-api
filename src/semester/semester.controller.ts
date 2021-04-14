import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester } from 'src/interfaces/Semester';

@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) { }

  @Get('/')
  async getAll(): Promise<Semester[]> {
    return this.semesterService.getAll();
  }

  @Get('/current')
  async getCurrentSemester(): Promise<Semester> {
    return this.semesterService.getCurrentSemester();
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() params: Semester): Promise<Semester> {
    params.id = id;
    return this.semesterService.update(params);
  }

  @Post('/sync/:gradeId')
  async sync(@Param('gradeId') gradeId: number): Promise<any> {
    return this.semesterService.sync(gradeId);
  }
}
