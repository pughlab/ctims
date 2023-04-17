import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";
import { CtmlJsonModule } from './ctml-json/ctml-json.module';
import { SchemaCtmlModule } from './schema-ctml/schema-ctml.module';
import { TrialModule } from './trial/trial.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CtmlJsonModule,
    SchemaCtmlModule,
    TrialModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
