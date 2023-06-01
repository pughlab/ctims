import { event_type, Prisma, user, trial, ctml_json, ctml_schema } from "@prisma/client";

export interface ICreateEvent {
  type: event_type,
  description?: string,
  metadata?: Prisma.JsonValue,
  // The only relevant property on the below Prisma entity types is the 'id' property, so pick just that as the type
  // This allows the user of a Prisma entity, or a simple { id: 1 } object.
  user?: Pick<user, 'id'>,
  trial?: Pick<trial, 'id'>,
  ctml_json?: Pick<ctml_json, 'id'>,
  ctml_schema?: Pick<ctml_schema, 'id'>
}
