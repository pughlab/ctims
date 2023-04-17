import { Injectable } from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';

@Injectable()
export class TrialService {
  create(createTrialDto: CreateTrialDto) {
    return 'This action adds a new trial';
  }

  findAll() {
    return `This action returns all trial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trial`;
  }

  update(id: number, updateTrialDto: UpdateTrialDto) {
    return `This action updates a #${id} trial`;
  }

  remove(id: number) {
    return `This action removes a #${id} trial`;
  }
}
