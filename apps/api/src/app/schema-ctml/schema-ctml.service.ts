import { Injectable } from '@nestjs/common';
import { CreateSchemaCtmlDto } from './dto/create-schema-ctml.dto';
import { UpdateSchemaCtmlDto } from './dto/update-schema-ctml.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class SchemaCtmlService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  create(createSchemaCtmlDto: CreateSchemaCtmlDto) {
    const newSchema = this.prismaService.schema_ctml.create({
      data: {
        version: "testVersion",
        schema: "Test Schema"
      }
    });
    return newSchema;
  }

  findAll() {
    return `This action returns all schemaCtml`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schemaCtml`;
  }

  update(id: number, updateSchemaCtmlDto: UpdateSchemaCtmlDto) {
    return `This action updates a #${id} schemaCtml`;
  }

  remove(id: number) {
    return `This action removes a #${id} schemaCtml`;
  }
}
