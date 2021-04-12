import { IDatabase, IMain } from 'pg-promise';
import { userSubject as sql } from '../sql';
import { UserSubject } from '../../interfaces/User';

export class UserSubjectRepository {
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

  async add(data: UserSubject): Promise<UserSubject> {
    return this.db.one(sql.add, data);
  }

  // Returns one records by id
  async findByUserId(id: number): Promise<UserSubject[]> {
    return this.db.manyOrNone(sql.findByUserId, {
      userId: id,
    });
  }


  // Returns all UserSubject records;
  async getAll(): Promise<UserSubject[]> {
    return this.db.manyOrNone(sql.findAll);
  }

  //update one UserSubject record
  async delete(id: number): Promise<boolean> {
    return this.db.one(sql.delete, { id: id });
  }
}
