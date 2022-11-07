import {Controller, Delete, Get} from '@nestjs/common';

import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prismaService: PrismaService) {}

  @Get()
  async getData() {
    return await this.prismaService.user.findMany({

    });
  }

  @Delete()
  async deleteData() {
    return await this.prismaService.user.deleteMany({

    });
  }
}
