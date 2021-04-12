import { IDatabase, IMain } from 'pg-promise';
import { semester as sql, calification as cSql, subject as sSql } from '../sql';
import _ from 'lodash';
import { Semester } from '../../interfaces/Semester';
import { Subject } from '../../interfaces/Subject';

export class SemesterRepository {

  constructor(private readonly db: IDatabase<any>, private readonly pgp: IMain) {

  }

  // Returns all Semester records;
  async getAll(): Promise<Semester[]> {
    return this.db.manyOrNone(sql.findAll);
  }
  async getCurrentSemester(): Promise<Semester> {
    return this.db.oneOrNone(sql.findCurrentSemester);
  }
  async update(data: Semester): Promise<Semester> {
    return this.db.oneOrNone(sql.update, data);
  }

  async sync(gradeId: number): Promise<any> {
    let query = '';
    let a = [];
    let toUpdate = [];
    const currentSemester: Semester = await this.db.oneOrNone(sql.findCurrentSemester);
    if (currentSemester.code % 2 === 0) {
      const allSemesters = await this.db.manyOrNone(sql.findAll);
      const previousSemester: Subject = allSemesters.find((c) => c.code === (currentSemester.code - 1));
      const allCalifications = await this.db.manyOrNone(cSql.findByGradeIdAndSemesterId, { gradeId: gradeId, semesterId: previousSemester.id });
      const allSubjects: Subject[] = await this.db.manyOrNone(sSql.findAll);
      const alumnInfo = _.uniqBy(allCalifications, 'alumnId');
      const queryString = ` 
      SELECT id AS "id",
      alumn_id AS "alumnId",
      grade_id AS "gradeId",
      subject_id AS "subjectId",
      value,
      semester_id AS "semesterId" 
      FROM ${process.env.SCHEMA_NAME}.previous_avg
     WHERE  grade_id=${gradeId} 
     `;
      let preAvg = await this.db.manyOrNone(queryString);

      allSubjects.forEach((s) => {
        alumnInfo.forEach((d) => {
          let total = 0;
          let count = 0;
          const byAlumn = allCalifications.filter((v) => v.alumnId === d.alumnId && v.subjectId === s.id);
          if (byAlumn) {
            byAlumn.forEach((r) => {
              total += r.value;
              count += 1;
            });
            let founded = preAvg.find((g) => g.alumnId === d.alumnId && g.subjectId === s.id);
            if (founded) {
              toUpdate.push({
                id: founded.id,
                value: total > 0 ? total / count : 0,
                semesterId: previousSemester.id
              });
            } else {
              a.push({
                alumnId: d.alumnId,
                gradeId: d.gradeId,
                subjectId: s.id,
                value: total > 0 ? total / count : 0,
                semesterId: previousSemester.id
              });
            }
          }
        });
      });

      if (toUpdate.length) {
        await this.updatePrevious(toUpdate);
      }
      if (a.length) {
        query = this.pgp.helpers.insert(a, this.getCsToSave()) + this.getColumnsNameToReturn();
        this.db.manyOrNone(query);
      }

    } else {
      return false;
    }
    return true;//this.db.manyOrNone(query);
  }
  private readonly columnsToSave = [
    { name: 'alumn_id', prop: 'alumnId' },
    { name: 'grade_id', prop: 'gradeId' },
    { name: 'subject_id', prop: 'subjectId' },
    { name: 'value', prop: 'value' },
    { name: 'semester_id', prop: 'semesterId' },
  ];
  getColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    alumn_id AS "alumnId",
    grade_id AS "gradeId",
    subject_id AS "subjectId",
    value,
    semester_id AS "semesterId" 
    `;
  }
  getCsToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsToSave, { table: 'previous_avg' });
  }

  async updatePrevious(data: any[]): Promise<any[]> {
    const query = `${this.pgp.helpers.update(data, this.getCalificationPgpToUpdate())} 
    WHERE v.id = t.id ${this.getUpdatedColumnsNameToReturn()}`;
    return this.db.manyOrNone(query);
  }

  getCalificationPgpToUpdate() {
    return new this.pgp.helpers.ColumnSet(this.columnsToUpdate, { table: 'previous_avg' });
  }
  private readonly columnsToUpdate = [
    '?id',
    { name: 'value', prop: 'value' },
    { name: 'semester_id', prop: 'semesterId' },
  ];

  getUpdatedColumnsNameToReturn() {
    return ` 
    RETURNING t.id AS "id"
       `;
  }





}
