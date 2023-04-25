import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotImplementedException,
  HttpStatus
} from '@nestjs/common';
import { CtmlJsonService } from './ctml-json.service';
import { CreateCtmlJsonDto } from './dto/create-ctml-json.dto';
import { UpdateCtmlJsonDto } from './dto/update-ctml-json.dto';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";

@Controller('ctml-jsons')
@ApiTags('CTML JSON')
export class CtmlJsonController {
  constructor(private readonly ctmlJsonService: CtmlJsonService) {}

  @Post()
  @ApiOperation({ summary: "Create a new CTML JSON record" })
  @ApiCreatedResponse({ description: "CTML JSON record created." })
  create(@Body() createCtmlJsonDto: CreateCtmlJsonDto) {
    return this.ctmlJsonService.create(createCtmlJsonDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all CTML JSON records" })
  @ApiFoundResponse({ description: "CTML JSON records found." })
  findAll() {
    return this.ctmlJsonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get a CTML JSON record" })
  @ApiFoundResponse({ description: "CTML JSON record found." })
  async findOne(@Param('id') id: string) {
    const entities = await this.ctmlJsonService.findOne(+id)
    return entities;
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a CTML JSON record" })
  @ApiResponse({ status: HttpStatus.OK, description: "CTML JSON records found." })
  update(@Param('id') id: string, @Body() updateCtmlJsonDto: UpdateCtmlJsonDto) {
    return this.ctmlJsonService.update(+id, updateCtmlJsonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Get all CTML JSON records" })
  @ApiNoContentResponse({ description: "CTML JSON record deleted." })
  async remove(@Param('id') id: string) {
    await this.ctmlJsonService.remove(+id);
  }
}
