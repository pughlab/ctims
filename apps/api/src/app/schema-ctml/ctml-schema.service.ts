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

  async create(createSchemaCtmlDto: CreateCtmlSchemaDto) {
    const newSchema = await this.prismaService.ctml_schema.create({
      data: { version: createSchemaCtmlDto.version, schema: JSON.stringify(createSchemaCtmlDto.schema) }
    });
    return newSchema;
  }

  findAll(): PrismaPromise<ctml_schema[]> {
    return this.prismaService.ctml_schema.findMany();
  }

  findOne(id: number): PrismaPromise<ctml_schema> {
    return this.prismaService.ctml_schema.findUnique({ where: { id } });
  }

  async findBySchemaVersion(schemaVersion: number): Promise<{ schema: any, version:number, id: number }> {
    const result = await this.prismaService.ctml_schema.findUnique({ where: { version: schemaVersion } });
    const schema = JSON.parse(result.schema);
    return { schema: schema, version: result.version, id: result.id };
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
