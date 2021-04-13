import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AlumnCalification, BatchCalifications, Calification } from 'src/interfaces/Calification';
import { CalificationCummulative } from 'src/interfaces/CummulativeCalification';
import { CalificationService } from './calification.service';
import { CreateAlumnCalificationDto } from './dto/create-alumn-calification.dto';
import { CreateBatchCalificationsDto } from './dto/create-batch-califications.dto';
import { CreateCalificationDto } from './dto/create-calification.dto';
import { UpdateCalificationDto } from './dto/update-calification.dto';

@Controller('calification')
export class CalificationController {
  constructor(private readonly calificationService: CalificationService) { }
  @Get('/')
  async getAll(): Promise<Calification[]> {
    return this.calificationService.getAll();

  }
  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Calification> {
    return this.calificationService.getById(id);
  }

  @Get('/alumn/:alumnId/')
  async getByAlumnId(@Param('alumnId') alumnId: number): Promise<Calification[]> {
    return this.calificationService.getByAlumnId(alumnId);
  }

  @Get('/grade/:gradeId/subject/:subjectId')
  async getByGradeAndSubjectId(@Param('gradeId') gradeId: number, @Param('subjectId') subjectId: number): Promise<Calification[]> {
    return this.calificationService.getByGradeAndSubject(gradeId, subjectId);
  }


  @Get('/cummulative/grade/:gradeId/subject/:subjectId')
  async getCummulativeByGradeAndSubjectId(@Param('gradeId') gradeId: number, @Param('subjectId') subjectId: number): Promise<CalificationCummulative[]> {
    return this.calificationService.getCummulativeByGradeAndSubject(gradeId, subjectId);
  }

  @Get('/cummulative/calification/:calificationId')
  async getByCalificationId(@Param('calificationId') calificationId: number): Promise<CalificationCummulative[]> {
    return this.calificationService.getCummulativeByCalificationId(calificationId);
  }

  @Get('/cummulative/calification/:calificationId/alumn/:alumnId')
  async getByCalificationIdAlumnId(@Param('calificationId') calificationId: number, @Param('alumnId') alumnId: number): Promise<Calification[]> {
    return this.calificationService.getCummulativeByCalificationIdAlumnId(calificationId, alumnId);
  }

  @Post('/')
  async post(@Body() data: CreateBatchCalificationsDto): Promise<BatchCalifications> {
    return this.calificationService.create(data);
  }

  @Post('/new')
  async postCalificationForNewAlumn(@Body() data: CreateAlumnCalificationDto[]): Promise<AlumnCalification[]> {
    return this.calificationService.createCalificationForNewAlumn(data);
  }

  @Post('/cummulative')
  async postCummulative(@Body() data: CreateBatchCalificationsDto): Promise<BatchCalifications> {
    return this.calificationService.createCummulativeCalifications(data);
  }

  @Put('/')
  async put(@Body() params: CreateCalificationDto[]): Promise<Calification[]> {
    return this.calificationService.update(params);
  }

  @Put('/cummulative')
  async putCummulative(@Body() params: CreateCalificationDto[]): Promise<Calification[]> {
    return this.calificationService.updateCummulatives(params);
  }
}
