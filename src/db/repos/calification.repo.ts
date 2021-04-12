import { IDatabase, IMain } from 'pg-promise';
import { calification as sql, semester as semesterSql } from '../sql';

import { AlumnCalification, Calification, CalificationIndicator } from '../../interfaces/Calification';
import { CalificationCummulative } from '../../interfaces/CummulativeCalification';
import { Semester } from '../../interfaces/Semester';

export class CalificationRepository {
  /**
   * @param db
   * Automated database connection context/interface.
   *
   * If you ever need to access other repositories from this one,
   * you will have to replace type 'IDatabase<any>' with 'any'.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(private readonly db: IDatabase<any>, private readonly pgp: IMain) {

  }
  async addCalification(data: Calification): Promise<Calification> {
    return this.db.one(sql.add, data);
  }

  // ===============
  async addAlumnCalifications(data: AlumnCalification[]): Promise<AlumnCalification[]> {
    const currentSemester: Semester = await this.db.oneOrNone(semesterSql.findCurrentSemester);
    const dataWithSemester = data.map((d) => {
      return {
        idCalification: d.idCalification,
        alumnId: d.alumnId,
        value: d.value,
        semesterId: currentSemester.id
      };
    });
    const query = this.pgp.helpers.insert(dataWithSemester, this.getCsToSave()) + this.getColumnsNameToReturn();
    return this.db.manyOrNone(query);
  }
  private readonly columnsToSave = [
    { name: 'id_calification', prop: 'idCalification' },
    { name: 'alumn_id', prop: 'alumnId' },
    { name: 'value', prop: 'value' },
    { name: 'semester_id', prop: 'semesterId' },
  ];
  getColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    alumn_id AS "alumnId",
    id_calification AS "idCalification",
    value,
    semester_id AS "semesterId" 
    `;
  }
  getCsToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsToSave, { table: 'alumn_calification' });
  }
  async addCummulativeCalifications(data: Calification[]): Promise<Calification[]> {
    const query = this.pgp.helpers.insert(data, this.getCsToSave()) + this.getColumnsNameToReturn();

    return this.db.manyOrNone(query);
  }
  // ===============


  async addCalificationIndicators(data: CalificationIndicator[]): Promise<CalificationIndicator[]> {
    const query = this.pgp.helpers.insert(data, this.getCalificationIndicatorToSave()) + this.getCalificationIndicatorColumnsNameToReturn();
    return this.db.manyOrNone(query);
  }
  private readonly columnsCalificationIndicatorToSave = [
    { name: 'calification_id', prop: 'calificationId' },
    { name: 'indicator_id', prop: 'indicatorId' }
  ];
  getCalificationIndicatorColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    calification_id AS "calificationId",
    indicator_id AS "indicatorId"`;
  }
  getCalificationIndicatorToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsCalificationIndicatorToSave, { table: 'calification_indicator' });
  }


  // Returns one records by id
  async findById(id: number): Promise<Calification> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByAlumnId(alumnId: number): Promise<Calification[]> {
    return this.db.manyOrNone(sql.findByAlumnId, {
      alumnId: alumnId,
    });
  }
  async findByGradeAndSubject(gradeId: number, subjectId: number): Promise<Calification[]> {
    return this.db.manyOrNone(sql.findByGradeIdAndSubjectId, {
      gradeId: gradeId, subjectId: subjectId,
    });
  }
  async findByGradeAndSemesterId(gradeId: number, semesterId: number): Promise<Calification[]> {

    return this.db.manyOrNone(sql.findByGradeIdAndSemesterId, {
      gradeId: gradeId, semesterId: semesterId,
    });
  }
  async findCummulativeByGradeAndSubject(gradeId: number, subjectId: number): Promise<CalificationCummulative[]> {
    return this.db.manyOrNone(sql.findCummulativesByGradeAndSubject, {
      gradeId: gradeId, subjectId: subjectId,
    });
  }
  async findCummulativeByCalificationId(calificationId: number): Promise<CalificationCummulative[]> {
    return this.db.manyOrNone(sql.findCummulativesByCalificationId, {
      calificationId: calificationId
    });
  }

  async findCummulativesByCalificationIdAlumnId(calificationId: number, alumnId: number): Promise<Calification[]> {
    return this.db.manyOrNone(sql.findCummulativesByCalificationIdAlumnId, {
      calificationId: calificationId,
      alumnId: alumnId
    });
  }
  // Returns all Calification records;
  async getAll(): Promise<Calification[]> {
    return this.db.manyOrNone(sql.findAll);
  }

  //update one Calification record
  async update(data: Calification): Promise<Calification> {
    return this.db.oneOrNone(sql.update, data);
  }


  async batchUpdate(data: Calification[]): Promise<Calification[]> {
    const query = `${this.pgp.helpers.update(data, this.getCalificationPgpToUpdate())} 
    WHERE v.id = t.id ${this.getUpdatedColumnsNameToReturn()}`;
    return this.db.manyOrNone(query);
  }

  getCalificationPgpToUpdate() {
    return new this.pgp.helpers.ColumnSet(this.columnsToUpdate, { table: 'alumn_calification' });
  }
  private readonly columnsToUpdate = [
    '?id',
    { name: 'value', prop: 'value' },
  ];

  getUpdatedColumnsNameToReturn() {
    return ` 
    RETURNING t.id AS "id"
       `;
  }
}
