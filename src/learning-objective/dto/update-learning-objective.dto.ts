import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningObjectiveDto } from './create-learning-objective.dto';

export class UpdateLearningObjectiveDto extends PartialType(CreateLearningObjectiveDto) {}
