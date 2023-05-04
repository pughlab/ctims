import { Test, TestingModule } from '@nestjs/testing';
import { CtmlJsonService } from './ctml-json.service';

describe('CtmlJsonService', () => {
  let service: CtmlJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CtmlJsonService],
    }).compile();

    service = module.get<CtmlJsonService>(CtmlJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
