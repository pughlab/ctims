import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { EventService } from "./event.service";

@Module({
  controllers: [],
  providers: [EventService, PrismaService]
})
export class EventModule {}
