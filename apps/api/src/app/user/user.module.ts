import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../prisma.service";
import {TrialService} from "../trial/trial.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, TrialService]
})
export class UserModule {}
