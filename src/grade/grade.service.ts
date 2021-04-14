import { Injectable, Logger } from '@nestjs/common';
import { db } from 'src/db';
import { Grade } from 'src/interfaces/Grade';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradeService {
  public async getAll(): Promise<Grade[]> {
    try {
      return await db.grade.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: Grade): Promise<Grade> {
    try {
      return await db.grade.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
