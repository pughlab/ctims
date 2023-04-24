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
      data: {
        version: "testVersion",
        schema: "Test Schema"
      }
    });
    return newSchema;
  }

  findAll(): PrismaPromise<ctml_schema[]> {
    return this.prismaService.ctml_schema.findMany();
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
    this.prismaService.ctml_schema.delete({ where: { id }});
  }
}
