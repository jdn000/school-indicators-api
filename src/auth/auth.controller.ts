import { Controller, Get, Post, Body, Put, Param, Delete, Logger, Res } from '@nestjs/common';
import { User, UserInputDTO } from 'src/interfaces/User';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  async SignUp(@Body() data: User) {
    Logger.debug('Calling Sign-Up endpoint with body: %o', data.username);
    const { user, token } = await this.authService.signUp(data);
    return {
      status: true,
      data: {
        user, token
      }
    };
  }

  @Post('/signin')
  async SignIn(@Body() data: UserInputDTO) {

    Logger.debug('Calling Sign-In endpoint with body: %o', data.username);
    const { token } = await this.authService.signIn(data);

    return {
      status: true,
      data: {
        username: data.username,
        token: token
      }
    };
  }

  @Post('/sign-out')
  LogOut(@Body() data: UserInputDTO, @Res() res: Response) {
    Logger.debug('Calling Sign-Out endpoint with body: %o', data.username);
    return res.status;
  }

  @Put('/reset-password/:id')
  async ResetPassword(@Param('id') id: number, @Body() params: User) {
    params.id = id;
    const user = await this.authService.resetPassword(params);
    return {
      status: true,
      data: {
        user
      }
    };
  }
}
