import { IDatabase, IMain } from 'pg-promise';
import { alumn, alumn as sql } from '../sql';
import { Alumn } from '../../interfaces/Alumn';
import { CalificationReport, ReportData } from '../../interfaces/Calification';

export class AlumnRepository {
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
    /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
  }

  async add(data: Alumn): Promise<Alumn> {

    const alumn = await this.db.one(sql.add, data);

    if (await this.addGradeAlumn(data.gradeId, alumn.id)) {

      return alumn;
    }
    return {} as Alumn;
  }

  async addGradeAlumn(gradeId: number, alumnId: number): Promise<boolean> {
    const query = this.pgp.helpers.insert({ gradeId, alumnId }, this.getCalificationIndicatorToSave()) + this.getColumnsToShow();
    return this.db.oneOrNone(query);
  }
  private readonly columnsCalificationIndicatorToSave = [
    { name: 'grade_id', prop: 'gradeId' },
    { name: 'alumn_id', prop: 'alumnId' }
  ];
  getColumnsToShow() {
    return ` RETURNING id AS "id",
    grade_id AS "gradeId",
    alumn_id AS "alumnId"`;
  }
  getCalificationIndicatorToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsCalificationIndicatorToSave, { table: 'grade_alumn' });
  }

  // Returns one records by id
  async findById(id: number): Promise<Alumn> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByRun(run: string): Promise<Alumn> {
    return this.db.oneOrNone(sql.findByRun, {
      run: run,
    });
  }

  // Returns all Alumn records;
  async getAll(): Promise<Alumn[]> {
    return this.db.any(sql.findAll);
  }

  async getAllDataToReport(gradeNumber: number): Promise<CalificationReport[]> {
    const alumnData = await this.db.manyOrNone(sql.findAllAlumnDataByGradeId, { gradeNumber: gradeNumber });
    return await Promise.all(alumnData.map(async (alumn) => {
      return {
        alumnId: alumn.alumnId,
        alumnFullName: alumn.alumnFullName,
        run: alumn.run,
        grade: alumn.grade,
        headTeacher: alumn.headTeacher,
        subjects: await this.getSubjectsInfo(alumn.alumnId)
      };
    }));
  }
  async getAlumnDataToReport(id: number): Promise<CalificationReport> {
    const alumnData = await this.db.oneOrNone(sql.findAlumnDataById, { id: id });
    return {
      alumnId: alumnData.alumnId,
      alumnFullName: alumnData.alumnFullName,
      run: alumnData.run,
      grade: alumnData.grade,
      headTeacher: alumnData.headTeacher,
      subjects: await this.getSubjectsInfo(alumnData.alumnId)
    };
  }
  //update one Alumn record
  async getSubjectsInfo(alumnId: number): Promise<any> {
    const queryString = ` 
    SELECT
    s.id AS "id",
    s.description AS "name",
    pa.value AS "firstSemesterAvg",
    se.code,
    json_agg(
    ac.value
     ) AS "califications"
    FROM ${process.env.SCHEMA_NAME}.alumn_calification ac
    INNER JOIN  ${process.env.SCHEMA_NAME}.calification c
    ON ac.id_calification=c.id
    INNER JOIN ${process.env.SCHEMA_NAME}.subject s
    ON c.subject_id=s.id
   LEFT JOIN ${process.env.SCHEMA_NAME}.previous_avg pa
   ON c.grade_id=pa.grade_id AND ac.alumn_id=pa.alumn_id AND s.id=pa.subject_id
   INNER JOIN ${process.env.SCHEMA_NAME}.semester se
   ON ac.semester_id=se.id AND se.status=true
   WHERE  ac.alumn_id=${alumnId}
   group by  s.id,s.description, s.id, pa.value,se.code`;
    return this.db.manyOrNone(queryString);
  }
  async update(data: Alumn): Promise<Alumn> {
    return this.db.oneOrNone(sql.update, data);
  }
  async addReport(data: ReportData): Promise<ReportData> {
    const query = this.pgp.helpers.insert(data, this.getReportColumnsToSave()) + this.getReportColumns();
    return this.db.oneOrNone(query);
  }
  private readonly reportColumns = [
    { name: 'path', prop: 'path' },

  ];
  getReportColumns() {
    return ` RETURNING
    id,
    path`;
  }
  getReportColumnsToSave() {
    return new this.pgp.helpers.ColumnSet(this.reportColumns, { table: 'report' });
  }
}
