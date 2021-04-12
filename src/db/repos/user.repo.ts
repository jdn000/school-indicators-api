import { IDatabase, IMain } from 'pg-promise';
import { user as sql } from '../sql';
import { User } from '../../interfaces/User';

export class UserRepository {
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
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
  }

  async add(data: User): Promise<User> {
    return this.db.one(sql.add, {
      username: data.username,
      password: data.password,
      salt: data.salt,
      firstName: data.firstName,
      lastName: data.lastName,
      secondSurname: data.secondSurname,
      roleId: data.roleId,
      email: data.email,
      //  profileImage: data.profileImage
    });
  }

  // Returns one records by id
  async findById(id: number): Promise<User> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.db.oneOrNone(sql.findByUsername, {
      username: username,
    });
  }

  // Returns all user records;
  async getAll(): Promise<User[]> {
    return this.db.any(sql.findAll);
  }

  //update one user record
  async update(data: User): Promise<User> {
    return this.db.oneOrNone(sql.update, data);
  }
  //update password
  async updatePassword(userRecord: User): Promise<User> {

    return this.db.oneOrNone(sql.updatePassword, { password: userRecord.password, salt: userRecord.salt, id: userRecord.id });
  }
}
