import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from '../db';
import { User } from 'src/interfaces/User';
@Injectable()
export class UserService {
  public async getAll(): Promise<User[]> {
    try {
      return await db.user.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<User> {
    try {
      //  const decoded = jwt.verify(token, "your secret or key");
      //  middlewares.isAuth;
      // var userId = decoded.user_data.user_id;
      return await db.user.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }


  public async create(data: User): Promise<User> {
    try {
      return await db.user.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: User): Promise<User> {
    try {
      return await db.user.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
