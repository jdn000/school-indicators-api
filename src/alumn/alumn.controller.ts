import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnService } from './alumn.service';
import { CreateAlumnDto } from './dto/create-alumn.dto';
import { UpdateAlumnDto } from './dto/update-alumn.dto';
import { Alumn } from '../interfaces/Alumn';
@Controller('alumn')
export class AlumnController {
  constructor(private readonly alumnService: AlumnService) { }

  @Post()
  create(@Body() createAlumnDto: CreateAlumnDto): Promise<Alumn> {
    return this.alumnService.create(createAlumnDto);
  }

  @Get()
  findAll(): Promise<Alumn[]> {
    return this.alumnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnDto: UpdateAlumnDto) {
    return this.alumnService.update(+id, updateAlumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnService.remove(+id);
  }
}
