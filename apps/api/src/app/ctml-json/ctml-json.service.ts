import { Injectable } from '@nestjs/common';
import { CreateCtmlJsonDto } from './dto/create-ctml-json.dto';
import { UpdateCtmlJsonDto } from './dto/update-ctml-json.dto';
import { ctml_json, PrismaPromise } from "@prisma/client";
import {PrismaService} from "../prisma.service";
import {NotFoundError} from "@prisma/client/runtime";

@Injectable()
export class CtmlJsonService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }
  create(createCtmlJsonDto: CreateCtmlJsonDto) {
    const { data, version } = createCtmlJsonDto;
    // const createdCtmlJson = this.prismaService.ctml_json.create({
    //   data: {
    //     data,
    //     versionId: schemaVersionId,
    //     trial_id: trialId
    //   }
    // });
    return null;
  }

  findAll(): Promise<ctml_json[]> {
    return this.prismaService.ctml_json.findMany();
  }

  findOne(id: number) {
    return this.prismaService.ctml_json.findUnique({ where: { id: id } });
  }

  async update(updateCtmlJsonDto: UpdateCtmlJsonDto): Promise<ctml_json> {
    const { data, version, trialId } = updateCtmlJsonDto;

    const ctml_schema_version = await this.prismaService.ctml_schema.findUnique({
      where: {
        version
      }
    })

    const existingJsons = await this.prismaService.ctml_json.findMany({
      where: {
        AND: [
          { trialId: trialId },
          { versionId: ctml_schema_version.id }
        ]
      }
    })

    if (existingJsons.length > 0) {
      const r = await this.prismaService.ctml_json.updateMany({
        data: {
          data,
        },
        where: {
          AND: [
            { trialId: trialId },
            { versionId: ctml_schema_version.id }
          ]
        }
      })
      return r[0]

    }

    return await this.prismaService.ctml_json.create({
      data: {
        data,
        versionId: ctml_schema_version.id,
        trialId: trialId
      }
    });
  }

  remove(id: number) {
    return this.prismaService.ctml_json.delete({ where: { id } });
  }
}
