import { Test, TestingModule } from '@nestjs/testing';
import { TrialLockService } from './trial-lock.service';
import { PrismaService } from '../prisma.service';
import { EventService } from '../event/event.service';
import {event_type, user} from '@prisma/client';

describe('TrialLockService', () => {
  let service: TrialLockService;
  let prismaService: PrismaService;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrialLockService,
        {
          provide: PrismaService,
          useValue: {
            trial_lock: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: EventService,
          useValue: {
            createEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrialLockService>(TrialLockService);
    prismaService = module.get<PrismaService>(PrismaService);
    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if the trial is already locked', async () => {
      const trialId = 1;
      const user: user = { id: 1, name: 'Test User' } as user;

      prismaService.trial_lock.findFirst = jest.fn().mockResolvedValue({ trialId, locked_by: user.id });

      await expect(service.create(trialId, user)).rejects.toThrow(`Trial ${trialId} is already locked`);
    });

    it('should create a new lock if the trial is not locked', async () => {
      const trialId = 1;
      const user: user = { id: 1, name: 'Test User' } as user;

      prismaService.trial_lock.findFirst = jest.fn().mockResolvedValue(null);
      prismaService.trial_lock.create = jest.fn().mockResolvedValue({ trialId, locked_by: user.id });
      eventService.createEvent = jest.fn();

      await service.create(trialId, user);

      expect(prismaService.trial_lock.create).toHaveBeenCalledWith({
        data: {
          trialId,
          locked_by: user.id,
        },
      });

      expect(eventService.createEvent).toHaveBeenCalledWith({
        type: event_type.TrialLocked,
        description: "Trial locked created via Post to trial-lock/:id",
        user,
      });
    });
  });
});
