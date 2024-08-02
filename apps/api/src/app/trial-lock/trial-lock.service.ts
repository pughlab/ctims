import {Injectable, NotFoundException, OnModuleInit} from "@nestjs/common";
import {EventService} from "../event/event.service";
import {PrismaService} from "../prisma.service";
import {ModuleRef} from "@nestjs/core";
import {event_type, user} from "@prisma/client";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class TrialLockService implements OnModuleInit {

  private eventService: EventService;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) {
  }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, {strict: false});
  }
  
  async getLockByOthers(trialId: number, user: user) {
    const trialLock = this.prismaService.trial_lock.findFirst({
      where: {
        trialId: trialId,
        user: {
          id: {
            not: user.id
          }
        }
      }
    });

    if (!trialLock) {
      throw new NotFoundException(`Trial ${trialId} is not locked`);
    }
    return trialLock;
  }

  async create(trialId: number, user: user) {
    const lock = await this.prismaService.trial_lock.findFirst({
      where: {
        trialId: trialId
      }
    });
    if (lock) {
      throw new Error(`Trial ${trialId} is already locked`);
    }

    await this.prismaService.trial_lock.create({
      data: {
        locked_at: new Date(),
        lock_expiry: new Date(new Date().getTime() + 1000 * 60 * 15), //15min lock
        trial: {
          connect: {id: trialId}
        },
        user: {
          connect: {id: user.id}
        }
      }
    });

    this.eventService.createEvent({
      type: event_type.TrialLocked,
      description: "Trial locked created via Post to trial-lock/:id",
      user,
    });
  }

  async unlock(trialId: number, user: user) {
    const lock = await this.prismaService.trial_lock.findMany({
      where: {
        trialId: trialId
      }
    });
    if (lock.length === 0) {
      throw new Error(`Trial ${trialId} is not locked`);
    }

    await this.prismaService.trial_lock.deleteMany({
      where: {
        trialId: trialId
      }
    });

    this.eventService.createEvent({
      type: event_type.TrialUnlocked,
      description: "Trial unlocked created via Post to trial-lock/:id/unlock",
      user,
    });
  }

  async releaseUserLocks(user: user) {
    await this.prismaService.trial_lock.deleteMany({
      where: {
        locked_by: user.id
      }
    });

    this.eventService.createEvent({
      type: event_type.TrialUnlocked,
      description: "All locks belonging to the user are released.",
      user,
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async clearExpiredLocksCron() {
    // await this.prismaService.trial_lock.deleteMany({
    //   where: {
    //     lock_expiry: {
    //       lt: new Date()
    //     }
    //   }
    // });
    // count how many lock are expired
    const expiredLocks = await this.prismaService.trial_lock.count({
      where: {
        lock_expiry: {
          lt: new Date()
        }
      }
    });
    console.log('Cleared expired locks', expiredLocks, new Date().toLocaleString());
  }
}
