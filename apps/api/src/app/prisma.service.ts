import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import { fieldEncryptionMiddleware } from "prisma-field-encryption";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    this.$use(fieldEncryptionMiddleware())
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
