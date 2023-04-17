import { Injectable } from '@nestjs/common';
import { CreateSchemaCtmlDto } from './dto/create-schema-ctml.dto';
import { UpdateSchemaCtmlDto } from './dto/update-schema-ctml.dto';

@Injectable()
export class SchemaCtmlService {
  create(createSchemaCtmlDto: CreateSchemaCtmlDto) {
    return 'This action adds a new schemaCtml';
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
