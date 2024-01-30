import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {PrismaService} from "../prisma.service";
import { ctml_schema, event_type, trial, user } from "@prisma/client";
import {PrismaExceptionTools} from "../utils/prisma-exception-tools";
import { UpdateTrialSchemasDto } from "./dto/update-trial-schemas.dto";
import { EventService } from "../event/event.service";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class TrialService implements OnModuleInit {

  private eventService: EventService;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }

  async createTrial(createTrialDto: CreateTrialDto, creatingUser: user) {
    const { nct_id, nickname, principal_investigator, status, protocol_no } = createTrialDto;

    const newTrial = await this.prismaService.trial.create({
      data: {
        nct_id,
        nickname,
        principal_investigator,
        status,
        user: { connect: {id: creatingUser.id } },
        modifiedBy: { connect: {id: creatingUser.id } },
        protocol_no: (typeof protocol_no === 'string') ? protocol_no : protocol_no.toString()
      }
    });
    return newTrial;
  }

  findAll(): Promise<trial[]> {
    return this.prismaService.trial.findMany();
  }

  async findOne(id: number): Promise<trial> {
    const result = await this.prismaService.trial.findUnique(
      {
        where: { id: id },
        include: {
          ctml_jsons: true,
        }
      }
    );
    result.ctml_jsons = result.ctml_jsons.map(val => {
      val.data = JSON.parse(val.data);
      return val;
    });

    return result;
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

    const {
      status,
      principal_investigator,
      nickname,
      ctml_schema_version,
      nct_id,
      protocol_no
    } = updateTrialDto;
    const existing_trial = await this.prismaService.trial.findUnique({
      where: {
        id
      }
    });

    if (existing_trial) {
      const updatedTrial = await this.prismaService.trial.update({
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
          },
          modifiedBy: { connect: { id: user.id } },
          trial_group: {
            connectOrCreate: {
              where: {
                name: updateTrialDto.group_id
              },
              create: {
                name: updateTrialDto.group_id
              }
            }
          },
          protocol_no: protocol_no === undefined ? '' :
            (typeof protocol_no !== 'string' ? protocol_no.toString() : protocol_no)
        }
      });

      // Add updated event
      this.eventService.createEvent({
        type: event_type.TrialUpdated,
        user,
        trial: updatedTrial,
        metadata: {
          input: {
            updateTrialDto: { ...updateTrialDto },
            id
          }
        }
      });
      return updatedTrial;
    }

    const createdTrial = await this.prismaService.trial.create({
      data: {
        nct_id,
        nickname,
        principal_investigator,
        status,
        user: { connect: { id: user.id } },
        modifiedBy: { connect: { id: user.id } },
        ctml_schemas: {
          connect: {
            version: ctml_schema_version
          }
        },
        trial_group: {
          connectOrCreate: {
            where: {
              name: updateTrialDto.group_id
            },
            create: {
              name: updateTrialDto.group_id
            }
          }
        },
        protocol_no: (typeof protocol_no === 'string') ? protocol_no : protocol_no?.toString()
      },
    });

    // Add created event
    this.eventService.createEvent({
      type: event_type.TrialCreated,
      user,
      trial: createdTrial,
      metadata: {
        input: {
          updateTrialDto: { ...updateTrialDto },
          id
        }
      }
    });
    return createdTrial;

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
