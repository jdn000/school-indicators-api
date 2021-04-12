import { Test, TestingModule } from '@nestjs/testing';
import { AlumnController } from './alumn.controller';
import { AlumnService } from './alumn.service';

describe('AlumnController', () => {
  let controller: AlumnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumnController],
      providers: [AlumnService],
    }).compile();

    controller = module.get<AlumnController>(AlumnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
