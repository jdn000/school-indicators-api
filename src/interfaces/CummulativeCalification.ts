export interface CummulativeCalification {
  id?: number;
  alumnId?: number;
  calificationId?: number;
  value: number;
  evaluationNumber?: number;
  semesterId?: number;
}

export interface CalificationCummulative {
  id?: number;
  calificationId?: number;
  cummulativeId?: number;
}

export interface BatchCummulativeCalifications {
  cummulativeCalifications?: CummulativeCalification[];
  indicators?: number[];
  calificationId?: number;
}
