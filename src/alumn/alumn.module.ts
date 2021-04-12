import { Module } from '@nestjs/common';
import { AlumnService } from './alumn.service';
import { AlumnController } from './alumn.controller';

@Module({
  controllers: [AlumnController],
  providers: [AlumnService]
})
export class AlumnModule {}
