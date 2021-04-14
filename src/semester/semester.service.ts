import { Injectable, Logger } from '@nestjs/common';
import { db } from 'src/db';
import { Semester } from 'src/interfaces/Semester';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterService {
  public async getAll(): Promise<Semester[]> {
    try {
      return await db.semester.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getCurrentSemester(): Promise<Semester> {
    try {
      return await db.semester.getCurrentSemester();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: Semester): Promise<Semester> {
    try {
      return await db.semester.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async sync(gradeId: number): Promise<any> {
    try {
      return await db.semester.sync(gradeId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
