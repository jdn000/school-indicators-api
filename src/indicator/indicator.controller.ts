import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { Indicator } from 'src/interfaces/Indicator';

@Controller('indicator')
export class IndicatorController {

  constructor(private readonly indicatorService: IndicatorService) { }

  @Get('/')
  async getAll(): Promise<Indicator[]> {
    return this.indicatorService.getAll();

  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Indicator> {
    return this.indicatorService.getById(id);
  }
  @Get('/objective/:objectiveId')
  async getByRun(@Param('objectiveId') objectiveId: number): Promise<Indicator[]> {
    return this.indicatorService.getByObjectiveId(objectiveId);
  }
  @Post('/')
  async post(@Body() data: Indicator): Promise<Indicator> {
    return this.indicatorService.create(data);
  }

  @Put('/:id')
  async put(@Param('id') id: number, @Body() params: Indicator): Promise<Indicator> {
    params.id = id;
    return this.indicatorService.update(params);

  }
}
