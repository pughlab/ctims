import { Test, TestingModule } from '@nestjs/testing';
import { CtmlJsonController } from './ctml-json.controller';
import { CtmlJsonService } from './ctml-json.service';

describe('CtmlJsonController', () => {
  let controller: CtmlJsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtmlJsonController],
      providers: [CtmlJsonService],
    }).compile();

    controller = module.get<CtmlJsonController>(CtmlJsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
