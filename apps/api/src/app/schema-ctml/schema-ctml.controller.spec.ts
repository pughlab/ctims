import { Test, TestingModule } from '@nestjs/testing';
import { SchemaCtmlController } from './schema-ctml.controller';
import { SchemaCtmlService } from './schema-ctml.service';

describe('SchemaCtmlController', () => {
  let controller: SchemaCtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchemaCtmlController],
      providers: [SchemaCtmlService],
    }).compile();

    controller = module.get<SchemaCtmlController>(SchemaCtmlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
