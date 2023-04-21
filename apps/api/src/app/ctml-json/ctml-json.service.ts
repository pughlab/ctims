import { Injectable } from '@nestjs/common';
import { CreateCtmlJsonDto } from './dto/create-ctml-json.dto';
import { UpdateCtmlJsonDto } from './dto/update-ctml-json.dto';
import {ctml_json} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import {NotFoundError} from "@prisma/client/runtime";

@Injectable()
export class CtmlJsonService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }
  create(createCtmlJsonDto: CreateCtmlJsonDto) {
    const { data, schemaVersionId, trialId } = createCtmlJsonDto;
    const createdCtmlJson = this.prismaService.ctml_json.create({
      data: {
        data,
        versionId: schemaVersionId,
        trial_id: trialId
      }
    });
    return createdCtmlJson;
  }

  findAll(): Promise<ctml_json[]> {
    return this.prismaService.ctml_json.findMany();
  }

  findOne(id: number) {
    return this.prismaService.ctml_json.findUnique({ where: { id: id } });
  }

  update(id: number, updateCtmlJsonDto: UpdateCtmlJsonDto) {
    return `This action updates a #${id} ctmlJson`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmlJson`;
  }
}
