import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AlumnService } from './alumn.service';
import { CreateAlumnDto } from './dto/create-alumn.dto';
import { UpdateAlumnDto } from './dto/update-alumn.dto';
import { Alumn } from '../interfaces/Alumn';
import { CalificationReport } from 'src/interfaces/Calification';
//TODO: Add Auth

@Controller('alumn')
export class AlumnController {
  constructor(private readonly alumnService: AlumnService) { }

  @Post()
  async create(@Body() createAlumnDto: CreateAlumnDto): Promise<Alumn> {
    return this.alumnService.create(createAlumnDto);
  }

  @Get()
  async findAll(): Promise<Alumn[]> {
    return this.alumnService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.alumnService.getById(+id);
  }

  @Get('/grade/:gradeNumber')
  async getAllData(@Param('gradeNumber') gradeNumber: number): Promise<CalificationReport[]> {
    return this.alumnService.getAllData(gradeNumber);
  }
  @Get('/run/:run')
  async getByRun(@Param('run') run: string): Promise<Alumn> {
    return this.alumnService.getByRun(run);
  }
  @Get('/:id/report')
  async getReportDataByAlumnId(@Param('id') id: number): Promise<CalificationReport> {
    return this.alumnService.getAlumnData(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAlumnDto: UpdateAlumnDto) {
    return this.alumnService.update(+id, updateAlumnDto);
  }


}
