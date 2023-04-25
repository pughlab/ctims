/**
 * See following link for error reference.
 * https://www.prisma.io/docs/reference/api-reference/error-reference
 */

import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

export class PrismaExceptionTools {
  static isRecordNotFoundException(e) {
    return e instanceof PrismaClientKnownRequestError && e.code === 'P2025';
  }

  static isForeignKeyConstraintError(e) {
    return e instanceof PrismaClientKnownRequestError && e.code === 'P2019';
  }
}
