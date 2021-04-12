import { IDatabase, IMain } from 'pg-promise';
import { learningObjective as sql } from '../sql';
import { LearningObjective, ObjectiveData } from '../../interfaces/LearningObjective';

export class LearningObjectiveRepository {
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

  async add(data: LearningObjective): Promise<LearningObjective> {
    return this.db.one(sql.add, data);
  }

  // Returns one records by id
  async findById(id: number): Promise<LearningObjective> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findBySubjectId(subjectId: number): Promise<LearningObjective[]> {
    return this.db.manyOrNone(sql.findBySubjectId, {
      subjectId: subjectId,
    });
  }
  async findByGradeIdAndSubjectId(subjectId: number, gradeId: number): Promise<LearningObjective[]> {
    return this.db.manyOrNone(sql.findByGradeIdAndSubjectId, {
      subjectId: subjectId,
      gradeId: gradeId
    });
  }

  async findAllDataById(id: number): Promise<ObjectiveData[]> {
    return this.db.manyOrNone(sql.findAllDataById, {
      objectiveId: id
    });
  }
  // Returns all LearningObjective records;
  async getAll(): Promise<LearningObjective[]> {
    return this.db.manyOrNone(sql.findAll);
  }

  //update one LearningObjective record
  async update(data: LearningObjective): Promise<LearningObjective> {
    return this.db.oneOrNone(sql.update, data);
  }
}

