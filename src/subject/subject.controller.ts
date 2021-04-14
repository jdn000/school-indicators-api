import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from '../interfaces/Subject';
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Get('/')
  async getAll(): Promise<Subject[]> {
    return this.subjectService.getAll();
  }

}
