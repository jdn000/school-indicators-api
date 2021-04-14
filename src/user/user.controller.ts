import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/interfaces/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Get('/')
  async getAll(): Promise<User[]> {
    return this.userService.getAll();

  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);

  }

  @Post('/')
  async post(@Body() data: User): Promise<string> {
    const { token } = await this.authService.signUp(data);

    return token;

  }

  @Put('/:id')
  async put(@Param('id') id: number, @Body() params: User): Promise<User> {
    params.id = id;
    return this.userService.update(params);

  }
}
