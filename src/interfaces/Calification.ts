export interface Calification {
  id?: number;
  subjectId?: number;
  isCummulative?: boolean;//
  objectiveId?: number;//
  evaluationNumber?: number;
  gradeId?: number;
  indicators?: number[];
  // tomado de AlumnCalif
  alumnId?: number;
  value?: number;
  calificationId?: number; // para notas acumulativas
  semesterId?: number;
}

export interface AlumnCalification {
  id?: number;
  alumnId?: number;
  value?: number;
  idCalification?: number;
  isCummulative?: boolean;
}

export interface BatchCalifications {
  mainCalification: Calification;
  califications: AlumnCalification[];
  indicators: number[];

}
export interface CalificationIndicator {
  id?: number;
  calificationId?: number;
  indicatorId?: number;
}
export interface ReportData {
  id?: number;
  path?: string;
}
export interface CalificationReport {
  alumnId: number;
  alumnFullName: number;
  date?: string;
  run: string;
  grade: number;
  headTeacher: string;
  subjects: any[];
}
