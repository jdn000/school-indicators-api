import { IDatabase, IMain } from 'pg-promise';
import { indicator as sql } from '../sql';
import { Indicator } from '../../interfaces/Indicator';

export class IndicatorRepository {
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

  async add(data: Indicator): Promise<Indicator> {
    return this.db.one(sql.add, data);
  }

  // Returns one records by id
  async findById(id: number): Promise<Indicator> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByObjectiveId(objectiveId: number): Promise<Indicator[]> {
    return this.db.manyOrNone(sql.findByObjectiveId, {
      objectiveId: objectiveId,
    });
  }

  // Returns all Indicator records;
  async getAll(): Promise<Indicator[]> {
    return this.db.any(sql.findAll);
  }

  //update one Indicator record
  async update(data: Indicator): Promise<Indicator> {
    return this.db.oneOrNone(sql.update, data);
  }
}
