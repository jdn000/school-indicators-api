import { IDatabase, IMain } from 'pg-promise';
import { cummulative as sql, semester as semesterSql } from '../sql';
import { CalificationCummulative, CummulativeCalification } from '../../interfaces/CummulativeCalification';
import { Calification } from '../../interfaces/Calification';
import { Semester } from '../../interfaces/Semester';

export class CummulativeRepository {
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

  // async addCummulative(data: CummulativeCalification[]): Promise<CummulativeCalification[]> {
  //   const query = this.pgp.helpers.insert(data, this.getCsToSave()) + this.getColumnsNameToReturn();
  //   return this.db.manyOrNone(query);
  // }
  private readonly columnsToSave = [
    { name: 'alumn_id', prop: 'alumnId' },
    { name: 'calification_id', prop: 'calificationId' },
    { name: 'value', prop: 'value' },
    { name: 'evaluation_number', prop: 'evaluationNumber' },
    { name: 'grade_id', prop: 'gradeId' },
    { name: 'subject_id', prop: 'subjectId' },
    { name: 'semester_id', prop: 'semesterId' },
  ];
  getColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    alumn_id AS "alumnId",
    calification_id AS "calificationId",
    grade_id AS "gradeId",
    subject_id AS "subjectId",
    value,
    evaluation_number AS "evaluationNumber",
    semester_id AS "semesterId" 
    `;
  }
  getCsToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsToSave, { table: 'cummulative_calification' });
  }

  async addCummulativeCalifications(data: Calification[]): Promise<Calification[]> {

    const currentSemester: Semester = await this.db.oneOrNone(semesterSql.findCurrentSemester);
    const dataWithSemester = data.map((d) => {
      return {
        calificationId: d.calificationId,
        alumnId: d.alumnId,
        gradeId: d.gradeId,
        subjectId: d.subjectId,
        evaluationNumber: d.evaluationNumber,
        value: d.value,
        semesterId: currentSemester.id
      };
    });
    const query = this.pgp.helpers.insert(dataWithSemester, this.getCsToSave()) + this.getColumnsNameToReturn();

    return this.db.manyOrNone(query);
  }

  async addCalificationPartialCalifications(data: CalificationCummulative[]): Promise<CalificationCummulative[]> {
    const query = this.pgp.helpers.insert(data, this.getCalificationPartialCalificationsToSave()) + this.getCalificationPartialCalificationsColumnsNameToReturn();
    return this.db.manyOrNone(query);
  }
  private readonly columnsCalificationPartialCalificationsToSave = [
    { name: 'calification_id', prop: 'calificationId' },
    { name: 'cummulative_id', prop: 'cummulativeId' }
  ];
  getCalificationPartialCalificationsColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    calification_id AS "calificationId",
    cummulative_id AS "cummulativeId"`;
  }
  getCalificationPartialCalificationsToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsCalificationPartialCalificationsToSave, { table: 'calification_partial_califications' });
  }



  // Returns one record by id
  async findById(id: number): Promise<CummulativeCalification> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByAlumnId(alumnId: number): Promise<CummulativeCalification[]> {
    return this.db.manyOrNone(sql.findByAlumnId, {
      alumnId: alumnId,
    });
  }
  async findByGradeAndSubject(gradeId: number, subjectId: number): Promise<CummulativeCalification[]> {
    return this.db.manyOrNone(sql.findByGradeIdAndSubjectId, {
      gradeId: gradeId, subjectId: subjectId,
    });
  }

  // Returns all CummulativeCalification records;
  async getAll(): Promise<CummulativeCalification[]> {
    return this.db.manyOrNone(sql.findAll);
  }

  //update one CummulativeCalification record
  async update(data: CummulativeCalification): Promise<CummulativeCalification> {
    return this.db.oneOrNone(sql.update, data);
  }

  async batchUpdate(data: Calification[]): Promise<Calification[]> {
    const query = `${this.pgp.helpers.update(data, this.getCalificationPgpToUpdate())}  WHERE v.id = t.id${this.getUpdatedColumnsNameToReturn()}`;
    return this.db.manyOrNone(query);
  }

  getCalificationPgpToUpdate() {
    return new this.pgp.helpers.ColumnSet(this.columnsToUpdate, { table: 'cummulative_calification' });
  }

  private readonly columnsToUpdate = [
    '?id',
    { name: 'value', prop: 'value' },

  ];
  getUpdatedColumnsNameToReturn() {
    return ` RETURNING
    t.id AS "id",
    t.alumn_id AS "alumnId",
    t.calification_id AS "calificationId",
    t.value,
    t.evaluation_number AS "evaluationNumber",
    t.grade_id AS "gradeId",
    t.subject_id AS "subjectId"
    `;
  }
}
