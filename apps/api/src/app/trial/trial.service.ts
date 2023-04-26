import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {PrismaService} from "../prisma.service";
import { ctml_schema, prisma, trial, user } from "@prisma/client";
import {PrismaExceptionTools} from "../utils/prisma-exception-tools";

@Injectable()
export class TrialService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async createTrial(createTrialDto: CreateTrialDto, creatingUser: user) {
    const { nctId, nickname, principalInvestigator, status } = createTrialDto;

    const newTrial = await this.prismaService.trial.create({
      data: {
        nct_id: nctId,
        nickname,
        principal_investigator: principalInvestigator,
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
    return this.prismaService.trial.findUnique({ where: { id: id }});
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

  async update(id: number, updateTrialDto: UpdateTrialDto) {
    const { ctml_schema_id, status, principalInvestigator, nickname, nctId } = updateTrialDto;
    try {
      // Find the most recent created JSON that has the version specified in the
      const jsonToUpdate = await this.prismaService.ctml_json.findFirst({
        where: {
          trial: { id },
          versionId: ctml_schema_id
        },
        orderBy: { createdAt: 'desc' }
      });
      const updatedTrialEntity = await this.prismaService.trial.update({
        where: { id },
        // Update the ctml_json associated with this trial record as well
        include: { ctml_jsons: true },
        data: {
          status,
          principal_investigator: principalInvestigator,
          nickname,
          nct_id: nctId
        }
      });


      return updatedTrialEntity;
    } catch (e) {
      // Check if the exception stems from the ID not existing in the trial db, throw appropriate exception.
      if (PrismaExceptionTools.isRecordNotFoundException(e)) {
        throw new NotFoundException(`Trial with ID ${id} not found`);
      }
      throw e;
    }
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
