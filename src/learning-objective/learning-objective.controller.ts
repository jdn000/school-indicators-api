import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LearningObjectiveService } from './learning-objective.service';
import { CreateLearningObjectiveDto } from './dto/create-learning-objective.dto';
import { UpdateLearningObjectiveDto } from './dto/update-learning-objective.dto';
import { LearningObjective, ObjectiveData } from 'src/interfaces/LearningObjective';

@Controller('learning-objective')
export class LearningObjectiveController {
  constructor(private readonly learningObjectiveService: LearningObjectiveService) { }

  @Get('/')
  async getAll(): Promise<LearningObjective[]> {
    return this.learningObjectiveService.getAll();

  }
  @Get('/:id')
  async getById(@Param('id') id: number): Promise<LearningObjective> {
    return this.learningObjectiveService.getById(id);
  }
  @Get('/subject/:subjectId')
  async getBySubjectId(@Param('subjectId') subjectId: number): Promise<LearningObjective[]> {
    return this.learningObjectiveService.getBySubjectId(subjectId);
  }

  @Get('/grade/:gradeId/subject/:subjectId')
  async getByGradeIdAndSubjectId(@Param('subjectId') subjectId: number, @Param('gradeId') gradeId: number): Promise<LearningObjective[]> {
    return this.learningObjectiveService.getByGradeIdAndSubjectId(subjectId, gradeId);
  }

  @Post('/')
  async post(@Body() data: LearningObjective): Promise<LearningObjective> {
    return this.learningObjectiveService.create(data);
  }

  @Put('/:id')
  async put(@Param('id') id: number, @Body() params: LearningObjective): Promise<LearningObjective> {
    params.id = id;
    return this.learningObjectiveService.update(params);

  }

  @Get('/all/:id')
  async getAllDataById(@Param('id') id: number): Promise<ObjectiveData[]> {
    return this.learningObjectiveService.getAllDataById(id);
  }
}
