import { Module } from '@nestjs/common';
import { LearningObjectiveService } from './learning-objective.service';
import { LearningObjectiveController } from './learning-objective.controller';

@Module({
  controllers: [LearningObjectiveController],
  providers: [LearningObjectiveService]
})
export class LearningObjectiveModule {}
