import { Injectable } from '@nestjs/common';
import { CreateCtmlJsonDto } from './dto/create-ctml-json.dto';
import { UpdateCtmlJsonDto } from './dto/update-ctml-json.dto';
import { ctml_json, event_type, user } from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class CtmlJsonService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async create(createCtmlJsonDto: CreateCtmlJsonDto) {
    const { data, version, trialId } = createCtmlJsonDto;
    const createdCtmlJson = await this.prismaService.ctml_json.create({
      data: {
        data,
        version: { connect: { version } },
        trial: { connect: { id: trialId } }
      }
    });
    return createdCtmlJson;
  }

  async findAll(): Promise<ctml_json[]> {
    let ctmlJsons = await this.prismaService.ctml_json.findMany();
    ctmlJsons = ctmlJsons.map(ctmlJson => {
      ctmlJson.data = JSON.parse(ctmlJson.data as string);
      return ctmlJson;
    })
    return ctmlJsons;
  }

  async findOne(id: number) {
    const ctmlJson = await this.prismaService.ctml_json.findUnique({
      where: { id: id }
    });
    ctmlJson.data = JSON.parse(ctmlJson.data as string);
    return ctmlJson;
  }

  async findByTrialId(trialId: number): Promise<ctml_json[]> {
    let ctmlJsons = await this.prismaService.ctml_json.findMany({
      where: {
        trialId: trialId
      }
    });
    ctmlJsons = ctmlJsons.map(ctmlJson => {
      ctmlJson.data = JSON.parse(ctmlJson.data as string);
      return ctmlJson;
    })
    return ctmlJsons;
  }

  async update(updateCtmlJsonDto: UpdateCtmlJsonDto): Promise<ctml_json[]> {
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
      });
      let affected = await this.prismaService.ctml_json.findMany({
        where: {
          AND: [
            { trialId: trialId },
            { versionId: ctml_schema_version.id }
          ]
        }
      });
      
      // Convert the string version of the data into an object
      affected = affected.map(val => {
        val.data = JSON.parse(val.data as string);
        return val;
      })
      return affected;

    }

    const newCtmlJson = await this.prismaService.ctml_json.create({
      data: {
        data,
        versionId: ctml_schema_version.id,
        trialId: trialId
      }
    });
    return [newCtmlJson];
  }

  remove(id: number) {
    return this.prismaService.ctml_json.delete({ where: { id } });
  }

}
