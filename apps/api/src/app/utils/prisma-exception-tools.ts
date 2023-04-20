/**
 * See following link for error reference.
 * https://www.prisma.io/docs/reference/api-reference/error-reference
 */

import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

export const isRecordNotFoundException = (e): boolean => {
  return e instanceof PrismaClientKnownRequestError && e.code === 'P2025';
}
