import { Injectable, Logger } from '@nestjs/common';
import { db } from 'src/db';
import { UserSubject } from 'src/interfaces/User';
import { CreateUserSubjectDto } from './dto/create-user-subject.dto';
import { UpdateUserSubjectDto } from './dto/update-user-subject.dto';

@Injectable()
export class UserSubjectService {
  public async getAll(): Promise<UserSubject[]> {
    try {
      return await db.userSubject.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getByUserId(data: number): Promise<UserSubject[]> {
    try {
      return await db.userSubject.findByUserId(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async create(data: UserSubject): Promise<UserSubject> {
    try {
      return await db.userSubject.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      return await db.userSubject.delete(id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
