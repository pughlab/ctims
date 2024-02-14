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
import { InfoModule } from './info/info.module';

@Global()
@Module({
  imports: [
    AuthModule,
    CtmlJsonModule,
    CtmlSchemaModule,
    TrialModule,
    UserModule,
    MatchminerModule,
    EventModule,
    InfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
