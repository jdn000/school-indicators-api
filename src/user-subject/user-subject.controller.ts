import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserSubjectService } from './user-subject.service';
import { CreateUserSubjectDto } from './dto/create-user-subject.dto';
import { UpdateUserSubjectDto } from './dto/update-user-subject.dto';
import { UserSubject } from 'src/interfaces/User';

@Controller('user-subject')
export class UserSubjectController {
  constructor(private readonly userSubjectService: UserSubjectService) { }

  @Get('/')
  async getAll(): Promise<UserSubject[]> {
    return this.userSubjectService.getAll();

  }

  @Get('/:id')
  //@UseBefore(celebrate(validators.userSubject.get))
  async getById(@Param('id') id: number): Promise<UserSubject[]> {
    return this.userSubjectService.getByUserId(id);
  }

  @Post('/')
  //@UseBefore(celebrate(validators.userSubject.post))
  async post(@Body() data: UserSubject): Promise<UserSubject> {
    return this.userSubjectService.create(data);
  }

  @Delete('/:id')
  // @UseBefore(celebrate(validators.userSubject.put))
  async put(@Param('id') id: number): Promise<boolean> {

    return this.userSubjectService.delete(id);

  }
}
