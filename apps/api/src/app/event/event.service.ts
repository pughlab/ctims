import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { event } from "@prisma/client";

@Injectable()
export class EventService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async createEvent(data: event): Promise<event> {
    return this.prismaService.event.create({ data });
  }
}
