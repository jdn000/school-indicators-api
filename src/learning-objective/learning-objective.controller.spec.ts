import { Test, TestingModule } from '@nestjs/testing';
import { LearningObjectiveController } from './learning-objective.controller';
import { LearningObjectiveService } from './learning-objective.service';

describe('LearningObjectiveController', () => {
  let controller: LearningObjectiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningObjectiveController],
      providers: [LearningObjectiveService],
    }).compile();

    controller = module.get<LearningObjectiveController>(LearningObjectiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
