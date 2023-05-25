import { event_type, Prisma, user } from "@prisma/client";

export interface ICreateEvent {
  type: event_type,
  description?: string,
  metadata?: Prisma.JsonValue,
  user?: user
}
