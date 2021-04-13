import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LearningObjectiveService } from './learning-objective.service';
import { CreateLearningObjectiveDto } from './dto/create-learning-objective.dto';
import { UpdateLearningObjectiveDto } from './dto/update-learning-objective.dto';

@Controller('learning-objective')
export class LearningObjectiveController {
  constructor(private readonly learningObjectiveService: LearningObjectiveService) { }

  @Post()
  create(@Body() createLearningObjectiveDto: CreateLearningObjectiveDto) {
    return this.learningObjectiveService.create(createLearningObjectiveDto);
  }

  @Get()
  findAll() {
    return this.learningObjectiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningObjectiveService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLearningObjectiveDto: UpdateLearningObjectiveDto) {
    return this.learningObjectiveService.update(+id, updateLearningObjectiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningObjectiveService.remove(+id);
  }
}
