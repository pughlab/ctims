import { Injectable } from '@nestjs/common';
import { CreateCtmlSchemaDto } from './dto/create-ctml-schema.dto';
import { UpdateCtmlSchemaDto } from './dto/update-ctml-schema.dto';
import {PrismaService} from "../prisma.service";
import { ctml_schema, PrismaPromise } from "@prisma/client";

@Injectable()
export class CtmlSchemaService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  create(createSchemaCtmlDto: CreateCtmlSchemaDto) {
    const newSchema = this.prismaService.ctml_schema.create({
      data: { ...createSchemaCtmlDto }
    });
    return newSchema;
  }

  findAll(): PrismaPromise<ctml_schema[]> {
    return this.prismaService.ctml_schema.findMany();
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
    // Find all schemas where at least one related trial is the
    // return this.prismaService.ctml_schema.findMany({
    //   where: {
    //     trials: {
    //       some: {
    //         id: trialId
    //       }
    //     }
    //   }
    // });
  }

  findOne(id: number): PrismaPromise<ctml_schema> {
    return this.prismaService.ctml_schema.findUnique({ where: { id } });
  }

  update(id: number, updateSchemaCtmlDto: UpdateCtmlSchemaDto): PrismaPromise<ctml_schema> {
    const newSchema = this.prismaService.ctml_schema.update({
      data: { ...updateSchemaCtmlDto },
      where: { id }
    })
    return newSchema;
  }

  remove(id: number) {
    return this.prismaService.ctml_schema.delete({ where: { id }});
  }
}
