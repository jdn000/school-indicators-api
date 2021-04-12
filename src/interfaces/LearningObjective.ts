import { AlumnCalification } from './Calification';

export interface LearningObjective {
  id?: number;
  subjectId: number;
  description: string;
  name: string;
  gradeId: number;
  objectiveId: number;
  hasCalifications?: boolean;
}

export interface ObjectiveData {
  id?: number;
  description: string;
  name: string;
  objectiveId: number;
  status: boolean;
  califications: AlumnCalification[];
}
