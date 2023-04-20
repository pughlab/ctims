import { Test, TestingModule } from '@nestjs/testing';
import { CtmlSchemaService } from './ctml-schema.service';

describe('SchemaCtmlService', () => {
  let service: CtmlSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CtmlSchemaService],
    }).compile();

    service = module.get<CtmlSchemaService>(CtmlSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
