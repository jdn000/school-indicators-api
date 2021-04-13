import { Injectable, Logger } from '@nestjs/common';
import { db } from 'src/db';
import { Calification, BatchCalifications, AlumnCalification, CalificationIndicator } from 'src/interfaces/Calification';
import { CalificationCummulative } from 'src/interfaces/CummulativeCalification';
import { CreateCalificationDto } from './dto/create-calification.dto';
import { UpdateCalificationDto } from './dto/update-calification.dto';

@Injectable()
export class CalificationService {
  public async getAll(): Promise<Calification[]> {
    try {
      return await db.calification.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<Calification> {
    try {
      return await db.calification.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getByAlumnId(alumnId: number): Promise<Calification[]> {
    try {
      return await db.calification.findByAlumnId(alumnId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getByGradeAndSubject(gradeId: number, subjectId: number): Promise<Calification[]> {
    try {
      return await db.calification.findByGradeAndSubject(gradeId, subjectId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getCummulativeByGradeAndSubject(gradeId: number, subjectId: number): Promise<CalificationCummulative[]> {
    try {
      return await db.calification.findCummulativeByGradeAndSubject(gradeId, subjectId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getCummulativeByCalificationId(calificationId: number): Promise<CalificationCummulative[]> {
    try {
      return await db.calification.findCummulativeByCalificationId(calificationId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getCummulativeByCalificationIdAlumnId(calificationId: number, alumnId: number): Promise<Calification[]> {
    try {
      return await db.calification.findCummulativesByCalificationIdAlumnId(calificationId, alumnId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async create(batchCalifications: BatchCalifications): Promise<BatchCalifications> {
    try {
      const savedBatchCalifications: BatchCalifications = {} as BatchCalifications;
      const mainCalificationToDb = await db.calification.addCalification(batchCalifications.mainCalification);
      if (mainCalificationToDb) {
        savedBatchCalifications.califications = await Promise.all(await db.calification.addAlumnCalifications(batchCalifications.califications.map((calification) => {
          return {
            alumnId: calification.alumnId,
            value: calification.value,
            idCalification: mainCalificationToDb.id,
          };
        })));
      }
      return savedBatchCalifications;

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async createCalificationForNewAlumn(califications: AlumnCalification[]): Promise<AlumnCalification[]> {
    try {
      return await Promise.all(await db.calification.addAlumnCalifications(califications.map((calification) => {
        return {
          alumnId: calification.alumnId,
          value: calification.value,
          idCalification: calification.idCalification
        };
      })));

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async createCummulativeCalifications(batchCalifications: BatchCalifications) {


    const savedBatchCalifications: BatchCalifications = {} as BatchCalifications;
    const califIndicatorArray: CalificationIndicator[] = [];
    if (batchCalifications.mainCalification.id) {
      const cummulativeCalificationsToSave = batchCalifications.califications.map((c) => {
        return {
          alumnId: c.alumnId,
          calificationId: batchCalifications.mainCalification.id,
          value: c.value,
          evaluationNumber: batchCalifications.mainCalification.evaluationNumber,
          gradeId: batchCalifications.mainCalification.gradeId,
          subjectId: batchCalifications.mainCalification.subjectId
        };
      });
      const cummulativeCalificationsSaved = await db.cummulative.addCummulativeCalifications(cummulativeCalificationsToSave);
      if (cummulativeCalificationsSaved) {
        cummulativeCalificationsSaved.forEach((c) => {
          batchCalifications.indicators.forEach((b) => {
            califIndicatorArray.push({
              calificationId: c.id,
              indicatorId: b
            });
          });
        });
        await db.calification.addCalificationIndicators(califIndicatorArray);
        savedBatchCalifications.califications = cummulativeCalificationsSaved.map((c) => {
          return {
            id: c.id,
            alumnId: c.alumnId,
            value: c.value,
          };
        });
      }
      batchCalifications.mainCalification.isCummulative = true;
      await this.updateSingleCalification(batchCalifications.mainCalification);
    }

    savedBatchCalifications.indicators = batchCalifications.indicators;
    return savedBatchCalifications;

  }

  public async saveCalificationIndicator(data: CalificationIndicator[]): Promise<CalificationIndicator[]> {
    try {
      return await db.calification.addCalificationIndicators(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: Calification[]): Promise<Calification[]> {
    try {
      return await db.calification.batchUpdate(data);

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async updateSingleCalification(data: Calification): Promise<Calification> {
    try {
      return await db.calification.update(data);

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async updateCummulatives(data: Calification[]): Promise<Calification[]> {
    try {
      return await db.cummulative.batchUpdate(data);

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
