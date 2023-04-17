import { Injectable } from '@nestjs/common';
import { CreateCtmlJsonDto } from './dto/create-ctml-json.dto';
import { UpdateCtmlJsonDto } from './dto/update-ctml-json.dto';

@Injectable()
export class CtmlJsonService {
  create(createCtmlJsonDto: CreateCtmlJsonDto) {
    return 'This action adds a new ctmlJson';
  }

  findAll() {
    return `This action returns all ctmlJson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ctmlJson`;
  }

  update(id: number, updateCtmlJsonDto: UpdateCtmlJsonDto) {
    return `This action updates a #${id} ctmlJson`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmlJson`;
  }
}
