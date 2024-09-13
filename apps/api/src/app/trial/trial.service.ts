import {HttpException, HttpStatus, Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {PrismaService} from "../prisma.service";
import { ctml_schema, event_type, trial, user } from "@prisma/client";
import {PrismaExceptionTools} from "../utils/prisma-exception-tools";
import { UpdateTrialSchemasDto } from "./dto/update-trial-schemas.dto";
import { EventService } from "../event/event.service";
import { ModuleRef } from "@nestjs/core";
import {TrialLockService} from "../trial-lock/trial-lock.service";

@Injectable()
export class TrialService implements OnModuleInit {

  private eventService: EventService;

  constructor(
    private readonly trialLockService: TrialLockService,
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) {
  }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }

  async createTrial(createTrialDto: CreateTrialDto, creatingUser: user) {
    const { trial_internal_id, nct_id, nickname, principal_investigator, status, protocol_no } = createTrialDto;

    const newTrial = await this.prismaService.trial.create({
      data: {
        trial_internal_id,
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

  async findOne(id: number, user: user,): Promise<trial> {
    // check if trial is locked
    const isLocked = await this.prismaService.trial_lock.findFirst({
      where: {
        trialId: id,
        user: {
          id: {
            not: user.id
          }
        }
      }
    });

    if (isLocked && isLocked.locked_by !== user.id) {
      throw new HttpException(`Trial with ID ${id} is currently locked.`, 423);
    } else {
      // update the lock
      await this.trialLockService.releaseUserLocks(user);
      // create new lock
      await this.trialLockService.create(id, user);
    }

    const result = await this.prismaService.trial.findUnique(
      {
        where: { id: id },
        include: {
          ctml_jsons: true,
          trial_group: true
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

  findTrialsByIds(trialIds: string[]): Promise<trial[]> {
    const trials = this.prismaService.trial.findMany({
      where: {
        trial_internal_id: {
          in: trialIds
        }
      },
      include: {
        ctml_jsons: true,
      }
    });
    return trials;
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
      protocol_no,
      trial_internal_id
    } = updateTrialDto;

    if (updateTrialDto.group_id === undefined || updateTrialDto.group_id === '') {
      throw new NotFoundException(`Trial Group ${id} not found.`);
    }

    const existing_trial = await this.prismaService.trial.findUnique({
      where: {
        id
      }
    });

    if (existing_trial) {
      await this.checkIsTrialLocked(id, user);

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
        trial_internal_id,
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
        protocol_no: (typeof protocol_no === 'string') ? protocol_no : protocol_no?.toString(),
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

  async updateTrialSchemaList(id: number, updateTrialSchemasDto: UpdateTrialSchemasDto, user: user) {
    await this.checkIsTrialLocked(id, user);
    return this.prismaService.trial.update({
      where: { id },
      data: {
        ctml_schemas: {
          set: updateTrialSchemasDto.schemaIdList.map(schemaId => ({ id: schemaId }))
        }
      }
    })
  }

  async delete(id: number, user: user) {
    await this.checkIsTrialLocked(id, user);
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

  async checkIsTrialLocked(trialId: number, user: user) {
    const isLocked = await this.prismaService.trial_lock.findFirst({
      where: {
        trialId: trialId,

      }
    });

    if (isLocked) {
      const isLockedBySelf = isLocked.locked_by === user.id;
      if (!isLockedBySelf) {
        throw new HttpException(`Trial with ID ${trialId} is currently locked.`, 423);
      } else {
        // update lock expiry???
      }
    }
  }
}
