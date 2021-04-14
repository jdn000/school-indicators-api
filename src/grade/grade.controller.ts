import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from 'src/interfaces/Grade';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) { }

  @Get('/')
  async getAll(): Promise<Grade[]> {
    return this.gradeService.getAll();
  }

  @Put('/:id')
  async put(@Param('id') id: number, @Body() params: Grade): Promise<Grade> {
    params.id = id;
    return this.gradeService.update(params);

  }
}
