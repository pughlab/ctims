import { Injectable } from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {PrismaService} from "../prisma.service";
import {trial} from "@prisma/client";

@Injectable()
export class TrialService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  create(createTrialDto: CreateTrialDto) {
    return null;
  }

  findAll(): Promise<trial[]> {
    return this.prismaService.trial.findMany();
  }

  findOne(id: number): Promise<trial> {
    return this.prismaService.trial.findUniqueOrThrow({ where: { id: id }});
  }

  findTrialsByUser(userId: number): Promise<trial[]> {
    const entities = this.prismaService.trial.findMany({
      where: {
        userId: userId
      }
    });
    return entities;
  }

  update(id: number, updateTrialDto: UpdateTrialDto) {
    return `This action updates a #${id} trial`;
  }

  remove(id: number) {
    return `This action removes a #${id} trial`;
  }
}
