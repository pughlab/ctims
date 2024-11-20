import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('info')
@ApiTags('info')
export class InfoController {

  constructor(private infoService: InfoService) {

  }

  @Get()
  @ApiOperation({summary: "Get app info"})
  getAppInfo() {
    return this.infoService.getAppInfo();
  }

}
