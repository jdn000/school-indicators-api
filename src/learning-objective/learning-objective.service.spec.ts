import { Test, TestingModule } from '@nestjs/testing';
import { LearningObjectiveService } from './learning-objective.service';

describe('LearningObjectiveService', () => {
  let service: LearningObjectiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningObjectiveService],
    }).compile();

    service = module.get<LearningObjectiveService>(LearningObjectiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
