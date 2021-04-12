import { QueryFile, IQueryFileOptions } from 'pg-promise';

const path = require('path');

///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query logic and its formatting parameters. However, this
// is very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////

export const user = {
  add: sql('user/add.sql'),
  update: sql('user/update.sql'),
  findAll: sql('user/findAll.sql'),
  findById: sql('user/findById.sql'),
  findByUsername: sql('user/findByUsername.sql'),
  updatePassword: sql('user/updatePassword.sql'),
};

export const alumn = {
  add: sql('alumn/add.sql'),
  update: sql('alumn/update.sql'),
  findAll: sql('alumn/findAll.sql'),
  findById: sql('alumn/findById.sql'),
  findByRun: sql('alumn/findByRun.sql'),
  findAllAlumnDataByGradeId: sql('alumn/findAllAlumnDataByGradeId.sql'),
  findAlumnDataById: sql('alumn/findAlumnDataById.sql'),
};
export const userSubject = {
  add: sql('userSubject/add.sql'),
  findAll: sql('userSubject/findAll.sql'),
  findByUserId: sql('userSubject/findByUserId.sql'),
  delete: sql('userSubject/delete.sql'),
};
export const grade = {
  findAll: sql('grade/findAll.sql'),
  update: sql('grade/update.sql'),
};
export const subject = {
  findAll: sql('subject/findAll.sql'),

};
export const semester = {
  findAll: sql('semester/findAll.sql'),
  findCurrentSemester: sql('semester/findCurrentSemester.sql'),
  update: sql('semester/update.sql'),
};
export const learningObjective = {
  add: sql('learningObjective/add.sql'),
  update: sql('learningObjective/update.sql'),
  findAll: sql('learningObjective/findAll.sql'),
  findById: sql('learningObjective/findById.sql'),
  findBySubjectId: sql('learningObjective/findBySubjectId.sql'),
  findByGradeIdAndSubjectId: sql('learningObjective/findByGradeIdAndSubjectId.sql'),
  findAllDataById: sql('learningObjective/findAllDataById.sql'),
};
export const calification = {
  add: sql('calification/add.sql'),
  update: sql('calification/update.sql'),
  findAll: sql('calification/findAll.sql'),
  findById: sql('calification/findById.sql'),
  findByAlumnId: sql('calification/findByAlumnId.sql'),
  findByGradeIdAndSubjectId: sql('calification/findByGradeIdAndSubjectId.sql'),
  findByGradeIdAndSemesterId: sql('calification/findByGradeIdAndSemesterId.sql'),
  findCummulativesByGradeAndSubject: sql('calification/findCummulativesByGradeAndSubject.sql'),
  findCummulativesByCalificationId: sql('calification/findCummulativesByCalificationId.sql'),
  findCummulativesByCalificationIdAlumnId: sql('calification/findCummulativesByCalificationIdAlumnId.sql'),
};

export const cummulative = {
  update: sql('cummulative/update.sql'),
  findAll: sql('cummulative/findAll.sql'),
  findById: sql('cummulative/findById.sql'),
  findByAlumnId: sql('cummulative/findByAlumnId.sql'),
  findByGradeIdAndSubjectId: sql('cummulative/findByGradeIdAndSubjectId.sql'),
};
export const calificationObjective = {
  add: sql('calificationObjective/add.sql'),
  update: sql('calificationObjective/update.sql'),
  findAll: sql('calificationObjective/findAll.sql'),
  findById: sql('calificationObjective/findById.sql'),
  findByObjectiveId: sql('calificationObjective/findByObjectiveId.sql'),
};
export const indicator = {
  add: sql('indicator/add.sql'),
  update: sql('indicator/update.sql'),
  findAll: sql('indicator/findAll.sql'),
  findById: sql('indicator/findById.sql'),
  findByObjectiveId: sql('indicator/findByObjectiveId.sql'),
};
// Helper for linking to external query files;
function sql(file: string): QueryFile {

  const fullPath: string = path.join(__dirname, file);
  const options: IQueryFileOptions = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,
    params: {
      schema: 'public', // replace ${schema~} with "public"
    },
  };

  const qf: QueryFile = new QueryFile(fullPath, options);
  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

///////////////////////////////////////////////////////////////////
// Possible alternative - enumerating all SQL files automatically:
// http://vitaly-t.github.io/pg-promise/utils.html#.enumSql
