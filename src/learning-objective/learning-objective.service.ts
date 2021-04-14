import { Injectable, Logger } from '@nestjs/common';
import { db } from 'src/db';
import { LearningObjective, ObjectiveData } from 'src/interfaces/LearningObjective';
import { CreateLearningObjectiveDto } from './dto/create-learning-objective.dto';
import { UpdateLearningObjectiveDto } from './dto/update-learning-objective.dto';

@Injectable()
export class LearningObjectiveService {
  public async getAll(): Promise<LearningObjective[]> {
    try {
      return await db.learningObjective.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<LearningObjective> {
    try {
      return await db.learningObjective.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getBySubjectId(data: number): Promise<LearningObjective[]> {
    try {
      return await db.learningObjective.findBySubjectId(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getByGradeIdAndSubjectId(subjectId: number, gradeId: number): Promise<LearningObjective[]> {
    try {
      return await db.learningObjective.findByGradeIdAndSubjectId(subjectId, gradeId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getAllDataById(id: number): Promise<ObjectiveData[]> {
    try {
      return await db.learningObjective.findAllDataById(id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async create(data: LearningObjective): Promise<LearningObjective> {
    try {
      return await db.learningObjective.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: LearningObjective): Promise<LearningObjective> {
    try {
      return await db.learningObjective.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
