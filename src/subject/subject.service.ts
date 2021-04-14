import { Injectable, Logger } from '@nestjs/common';
import { db } from 'src/db';
import { Subject } from 'src/interfaces/Subject';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {

  public async getAll(): Promise<Subject[]> {
    try {
      return await db.subject.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
