import { Test, TestingModule } from '@nestjs/testing';
import { TrialService } from './trial.service';

describe('TrialService', () => {
  let service: TrialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialService],
    }).compile();

    service = module.get<TrialService>(TrialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
