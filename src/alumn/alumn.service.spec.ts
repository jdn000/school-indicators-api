import { Test, TestingModule } from '@nestjs/testing';
import { AlumnService } from './alumn.service';

describe('AlumnService', () => {
  let service: AlumnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlumnService],
    }).compile();

    service = module.get<AlumnService>(AlumnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
