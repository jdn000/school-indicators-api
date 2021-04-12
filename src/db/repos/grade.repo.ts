import { IDatabase, IMain } from 'pg-promise';
import { grade as sql } from '../sql';

import { Grade } from '../../interfaces/Grade';

export class GradeRepository {

  constructor(private readonly db: IDatabase<any>, private readonly pgp: IMain) {

  }


  // Returns all Grade records;
  async getAll(): Promise<Grade[]> {
    return this.db.manyOrNone(sql.findAll);
  }
  async update(data: Grade): Promise<Grade> {
    return this.db.oneOrNone(sql.update, data);
  }
}
