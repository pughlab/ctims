import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {PrismaService} from "../prisma.service";
import { ctml_json, ctml_schema, prisma, trial, user } from "@prisma/client";
import {PrismaExceptionTools} from "../utils/prisma-exception-tools";
import { UpdateTrialSchemasDto } from "./dto/update-trial-schemas.dto";

@Injectable()
export class TrialService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async createTrial(createTrialDto: CreateTrialDto, creatingUser: user) {
    const { nct_id, nickname, principal_investigator, status } = createTrialDto;

    const newTrial = await this.prismaService.trial.create({
      data: {
        nct_id,
        nickname,
        principal_investigator,
        status,
        userId: creatingUser.id,
        modifiedById: creatingUser.id
      }
    });
    return newTrial;
  }

  findAll(): Promise<trial[]> {
    return this.prismaService.trial.findMany();
  }

  findOne(id: number): Promise<trial> {
    return this.prismaService.trial.findUnique(
      {
        where: { id: id },
        include: {
          ctml_jsons: true,
        }
      }
    );
  }

  findTrialsByUser(userId: number): Promise<trial[]> {
    const entities = this.prismaService.trial.findMany({
      where: {
        userId: userId
      }
    });
    return entities;
  }

  async findSchemasByTrial(trialId: number): Promise<ctml_schema[]> {
    const foundTrial = await this.prismaService.trial.findUnique({
      include: { ctml_schemas: true },
      where: { id: trialId }
    });
    if (!foundTrial) {
      return null;
    }
    return foundTrial.ctml_schemas;
  }

  async update(id: number, updateTrialDto: UpdateTrialDto,
               user: user
  ): Promise<trial> {

    const { status, principal_investigator, nickname, ctml_schema_version, nct_id } = updateTrialDto;
    const existing_trial = await this.prismaService.trial.findUnique({
      where: {
        id
      }
    });

    if (existing_trial) {
      return await this.prismaService.trial.update({
        where: { id: existing_trial.id },
        data: {
          status,
          principal_investigator,
          nickname,
          nct_id,
          ctml_schemas: {
            connect: {
              version: ctml_schema_version
            }
          }
        }
      });
    }

    return await this.prismaService.trial.create({
      data: {
        nct_id,
        nickname,
        principal_investigator,
        status,
        userId: user.id,
        modifiedById: user.id,
        ctml_schemas: {
          connect: {
            version: ctml_schema_version
          }
        }
      }
    });

  }

  async updateTrialSchemaList(id: number, updateTrialSchemasDto: UpdateTrialSchemasDto) {
    return this.prismaService.trial.update({
      where: { id },
      data: {
        ctml_schemas: {
          set: updateTrialSchemasDto.schemaIdList.map(schemaId => ({ id: schemaId }))
        }
      }
    })
  }

  async delete(id: number) {
    try {
      await this.prismaService.trial.delete({
        where: { id }
      });
    } catch (e) {
      // Check if the exception stems from the ID not existing in the trial db, throw appropriate exception.
      if (PrismaExceptionTools.isRecordNotFoundException(e)) {
        throw new NotFoundException(`Trial with ID ${id} not found`);
      }
      throw e;
    }
  }
}
