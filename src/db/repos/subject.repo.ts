import { IDatabase, IMain } from 'pg-promise';
import { subject as sql } from '../sql';

import { Subject } from '../../interfaces/Subject';

export class SubjectRepository {

  constructor(private readonly db: IDatabase<any>, private readonly pgp: IMain) {

  }

  // Returns all Subject records;
  async getAll(): Promise<Subject[]> {
    return this.db.manyOrNone(sql.findAll);
  }

}
