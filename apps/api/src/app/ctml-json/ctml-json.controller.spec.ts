import { Test, TestingModule } from '@nestjs/testing';
import { CtmlJsonController } from './ctml-json.controller';

describe('CtmlJsonController', () => {
  let controller: CtmlJsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtmlJsonController],
    }).compile();

    controller = module.get<CtmlJsonController>(CtmlJsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
