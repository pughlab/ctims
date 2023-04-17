import { Test, TestingModule } from '@nestjs/testing';
import { SchemaCtmlService } from './schema-ctml.service';

describe('SchemaCtmlService', () => {
  let service: SchemaCtmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchemaCtmlService],
    }).compile();

    service = module.get<SchemaCtmlService>(SchemaCtmlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
