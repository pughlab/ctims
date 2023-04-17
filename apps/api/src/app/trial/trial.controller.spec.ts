import { Test, TestingModule } from '@nestjs/testing';
import { TrialController } from './trial.controller';
import { TrialService } from './trial.service';

describe('TrialController', () => {
  let controller: TrialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrialController],
      providers: [TrialService],
    }).compile();

    controller = module.get<TrialController>(TrialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
