import {Global, Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";
import { CtmlJsonModule } from './ctml-json/ctml-json.module';
import { CtmlSchemaModule } from './schema-ctml/ctml-schema.module';
import { TrialModule } from './trial/trial.module';
import { UserModule } from './user/user.module';
import {AuthModule} from "./auth/auth.module";
import { EventModule } from "./event/event.module";
import { MatchminerModule } from './matchminer/matchminer.module';
import { GeneModule } from './gene/gene.module';
import { InfoModule } from './info/info.module';
import {MessageQueueModule} from "./message-queue/message-queue.module";
import {TrialLockModule} from "./trial-lock/trial-lock.module";
import {ScheduleModule} from "@nestjs/schedule";

@Global()
@Module({
  imports: [
    AuthModule,
    CtmlJsonModule,
    CtmlSchemaModule,
    TrialModule,
    TrialLockModule,
    UserModule,
    MatchminerModule,
    EventModule,
    GeneModule,
    InfoModule,
    MessageQueueModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
