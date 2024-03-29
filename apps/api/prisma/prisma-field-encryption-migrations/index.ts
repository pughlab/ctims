// This file was generated by prisma-field-encryption.

import { migrate as migratectml_json } from './ctml_json'
import {PrismaClient} from "@prisma/client";
import { fieldEncryptionMiddleware } from "prisma-field-encryption";

export interface ProgressReport {
  model: string
  processed: number
  totalCount: number
  performance: number
}

export type ProgressReportCallback = (
  progress: ProgressReport
) => void | Promise<void>

export const defaultProgressReport: ProgressReportCallback = ({
  model,
  totalCount,
  processed,
  performance
}) => {
  const length = totalCount.toString().length
  const pct = Math.round((100 * processed) / totalCount)
    .toString()
    .padStart(3)
  console.info(
    `${model.padEnd(9)} ${pct}% processed ${processed
      .toString()
      .padStart(length)} / ${totalCount} (took ${performance.toFixed(2)}ms)`
  )
}

// --

export type MigrationReport = {
  ctml_json: number
}

/**
 * Migrate models concurrently.
 *
 * Processed models:
 * - ctml_json
 *
 * @returns a dictionary of the number of processed records per model.
 */
export async function migrate(
  client: PrismaClient,
  reportProgress: ProgressReportCallback = defaultProgressReport
): Promise<MigrationReport> {
  const [
    processedctml_json
  ] = await Promise.all([
    migratectml_json(client, reportProgress)
  ])
  return {
    ctml_json: processedctml_json
  }
}


const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());
migrate(prisma).then(val => console.log(val));
