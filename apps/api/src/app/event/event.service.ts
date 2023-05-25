import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { event } from "@prisma/client";
import { ICreateEvent } from "./create-event.interface";
import { mockSession } from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;

@Injectable()
export class EventService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async createEvent(data: ICreateEvent): Promise<event> {
    return this.prismaService.event.create({
      data: {
        ...data,
        user: { connect: { id: data.user.id }},
      }
    });
  }
}
