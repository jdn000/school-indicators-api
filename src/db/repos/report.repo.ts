import { IDatabase, IMain } from 'pg-promise';
import fs from 'fs';

import { CalificationReport, ReportData } from '../../interfaces/Calification';

export class ReportRepository {
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


  async getReportPath(id: number): Promise<any> {
    const queryString = ` 
    SELECT
    path AS "path"
    FROM ${process.env.SCHEMA_NAME}.report
   WHERE  id=${id}
   `;
    return this.db.oneOrNone(queryString);
  }
  async deleteReportAfterDownload(path: string): Promise<any> {

    return fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }

    });
  }




}
