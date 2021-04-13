import { Injectable, Inject } from '@nestjs/common';
import { CreateAlumnDto } from './dto/create-alumn.dto';
import { UpdateAlumnDto } from './dto/update-alumn.dto';
import { Alumn } from '../interfaces/Alumn';
import { db } from '../db';
import { CalificationReport } from 'src/interfaces/Calification';
import _ from 'lodash';
@Injectable()
export class AlumnService {
  constructor() { }

  async findAll(): Promise<Alumn[]> {
    try {
      const data = await db.alumn.getAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }



  async update(id: number, updateAlumnDto: UpdateAlumnDto) {
    updateAlumnDto.id = id;
    return await db.alumn.update(updateAlumnDto);
  }

  async getAll(): Promise<Alumn[]> {
    try {
      return await db.alumn.getAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(data: number): Promise<Alumn> {
    try {
      return await db.alumn.findById(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getByRun(data: string): Promise<Alumn> {
    try {
      return await db.alumn.findByRun(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //TODO Refactor
  async create(data: CreateAlumnDto): Promise<Alumn> {
    try {
      let cummulatives = [];
      let notCummulatives = [];
      let all = [];
      let indicators = [];

      const alumn = await db.alumn.add(data);
      const subjects = await db.subject.getAll();
      let x = await Promise.all(subjects.map(async (subject) => {
        let calificationsByGradeAndSubject = await db.calification.findByGradeAndSubject(data.gradeId, subject.id);
        calificationsByGradeAndSubject = _.uniqBy(calificationsByGradeAndSubject, 'evaluationNumber');
        return calificationsByGradeAndSubject.map((c) => {
          return { calificationId: c.calificationId, isCummulative: c.isCummulative };
        });
      }));

      x.forEach((i) => {
        i.forEach((n) => {
          if (n.isCummulative) {
            cummulatives.push(n);
          } else {
            notCummulatives.push(n);
          }
        });
      });

      let y = await Promise.all(cummulatives.map(async (cm) => {
        let resp = await db.calification.findCummulativeByCalificationId(cm.calificationId);
        resp = _.uniqBy(resp, 'evaluationNumber');
        return resp;
      }));

      y.forEach((k) => {
        k.forEach((y) => {
          all.push(y);
        });
      });

      const summativesArray = notCummulatives.map((s) => {
        return {
          alumnId: alumn.id,
          idCalification: s.calificationId,
          value: 2
        };
      });


      const cummulativesArray = all.map((cummulative) => {
        return {
          alumnId: alumn.id,
          subjectId: cummulative.subjectId,
          gradeId: cummulative.gradeId,
          calificationId: cummulative.calificationId,
          value: 2,
          evaluationNumber: cummulative.evaluationNumber,
          mainCalificationId: cummulative.mainCalificationId
        };
      });
      let summativeToDb = summativesArray.length ? await db.calification.addAlumnCalifications(summativesArray) : [];
      if (cummulativesArray.length) {
        const cummulativesToDb = await db.cummulative.addCummulativeCalifications(cummulativesArray);
        if (cummulativesToDb) {
          indicators = cummulativesToDb.map((c) => {
            let calificationFounded = all.find((l) => l.evaluationNumber === c.evaluationNumber && l.calificationId === c.calificationId);
            return {
              calificationId: c.calificationId,
              indicatorId: calificationFounded.indicatorId
            };
          });
          let indicatorsToDb = indicators.length ? await db.calification.addCalificationIndicators(indicators) : [];
        }
      }
      return alumn;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async getAllData(gradeNumber: number): Promise<CalificationReport[]> {
    try {
      return await db.alumn.getAllDataToReport(gradeNumber);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAlumnData(id: number): Promise<CalificationReport> {
    try {
      return await db.alumn.getAlumnDataToReport(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
