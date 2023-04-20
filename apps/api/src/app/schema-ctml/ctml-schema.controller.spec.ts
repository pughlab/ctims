import { Test, TestingModule } from '@nestjs/testing';
import { CtmlSchemaController } from './ctml-schema.controller';
import { CtmlSchemaService } from './ctml-schema.service';

describe('SchemaCtmlController', () => {
  let controller: CtmlSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtmlSchemaController],
      providers: [CtmlSchemaService],
    }).compile();

    controller = module.get<CtmlSchemaController>(CtmlSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
