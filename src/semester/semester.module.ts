import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';

@Module({
  controllers: [SemesterController],
  providers: [SemesterService],
  exports: [SemesterModule]

})
export class SemesterModule { }



