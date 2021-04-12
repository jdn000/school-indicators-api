import * as promise from 'bluebird';
import { IInitOptions, IDatabase, IMain } from 'pg-promise';
import * as dotenv from 'dotenv';
import {
    IExtensions,
    UserRepository,
    AlumnRepository,
    GradeRepository,
    SubjectRepository,
    LearningObjectiveRepository,
    CalificationRepository,
    IndicatorRepository,
    CummulativeRepository,
    ReportRepository,
    SemesterRepository,
    UserSubjectRepository
} from './repos';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;
dotenv.config();

const initOptions: IInitOptions<IExtensions> = {
    promiseLib: promise,
    extend(obj: ExtendedProtocol) {
        obj.user = new UserRepository(obj, pgp);
        obj.alumn = new AlumnRepository(obj, pgp);
        obj.grade = new GradeRepository(obj, pgp);
        obj.subject = new SubjectRepository(obj, pgp);
        obj.learningObjective = new LearningObjectiveRepository(obj, pgp);
        obj.calification = new CalificationRepository(obj, pgp);
        obj.indicator = new IndicatorRepository(obj, pgp);
        obj.cummulative = new CummulativeRepository(obj, pgp);
        obj.report = new ReportRepository(obj, pgp);
        obj.userSubject = new UserSubjectRepository(obj, pgp);
        obj.semester = new SemesterRepository(obj, pgp);
    },
};

// Initializing the library:
const pgp = require('pg-promise')(initOptions);

const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }

};

const db: ExtendedProtocol = pgp(dbConfig);

export { db, pgp };
