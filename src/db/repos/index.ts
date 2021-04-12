import { AlumnRepository } from './alumn.repo';
import { CalificationRepository } from './calification.repo';
import { CummulativeRepository } from './cummulative.repo';
import { GradeRepository } from './grade.repo';
import { IndicatorRepository } from './indicator.repo';
import { LearningObjectiveRepository } from './learnigObjective.repo';
import { ReportRepository } from './report.repo';
import { SemesterRepository } from './semester.repo';
import { SubjectRepository } from './subject.repo';
import { UserRepository } from './user.repo';
import { UserSubjectRepository } from './userSubject.repo';


// Database Interface Extensions:
interface IExtensions {
  user: UserRepository;
  alumn: AlumnRepository;
  grade: GradeRepository;
  subject: SubjectRepository;
  learningObjective: LearningObjectiveRepository;
  calification: CalificationRepository;
  indicator: IndicatorRepository;
  cummulative: CummulativeRepository;
  report: ReportRepository;
  userSubject: UserSubjectRepository;
  semester: SemesterRepository;
}

export {
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
  UserSubjectRepository,
  SemesterRepository
};
