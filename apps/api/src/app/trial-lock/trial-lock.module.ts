import { Module } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {TrialLockService} from "./trial-lock.service";
import {TrialLockController} from "./trial-lock.controller";

@Module({
  controllers: [TrialLockController],
  providers: [TrialLockService, PrismaService]
})
export class TrialLockModule {}
