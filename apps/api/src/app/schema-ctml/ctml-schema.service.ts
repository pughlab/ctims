import { Injectable } from '@nestjs/common';
import { CreateCtmlSchemaDto } from './dto/create-ctml-schema.dto';
import { UpdateCtmlSchemaDto } from './dto/update-ctml-schema.dto';
import {PrismaService} from "../prisma.service";

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

  findAll() {
    return `This action returns all schemaCtml`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schemaCtml`;
  }

  update(id: number, updateSchemaCtmlDto: UpdateCtmlSchemaDto) {
    return `This action updates a #${id} schemaCtml`;
  }

  remove(id: number) {
    return `This action removes a #${id} schemaCtml`;
  }
}
