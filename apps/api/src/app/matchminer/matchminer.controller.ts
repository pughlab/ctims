import { Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MatchminerService } from './matchminer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios, {AxiosResponse} from 'axios';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as FormData from 'form-data';
import { KeycloakPasswordGuard } from '../auth/KeycloakPasswordGuard';
import { CurrentUser } from '../auth/CurrentUser';
import {user} from "@prisma/client";
import { ApiKeyGuard } from '../auth/apiKeyGuard';

@Controller('matchminer')
@ApiTags('matchminer')
export class MatchminerController {

  private MM_API_TOKEN = process.env.MM_API_TOKEN;

  constructor(private matchMinerService: MatchminerService) {

  }

  @Post('load_clinical')
  @UseGuards(KeycloakPasswordGuard)
  @ApiOperation({ summary: "Load clinical file" })
  @UseInterceptors(FileInterceptor('clinical_file'))
  async loadClinicalFile(@UploadedFile() file: any, @Res() res) {
    const formData = new FormData();
    formData.append('clinical_file', file.buffer, file.originalname);
    const response = await axios.post(`${process.env.MM_API_URL}/load_clinical`, formData, {
      headers: {...formData.getHeaders(), 'Authorization': `Bearer ${this.MM_API_TOKEN}`},
    });
    return res.status(200).json({ message: 'File uploaded successfully' });

  }

  @Post('load_genomic')
  @UseGuards(KeycloakPasswordGuard)
  @ApiOperation({ summary: "Load genomic file" })
  @UseInterceptors(FileInterceptor('genomic_file'))
  async loadGenomicFile(@UploadedFile() file: any) {
    const formData = new FormData();
    formData.append('genomic_file', file.buffer, file.originalname);
    const response = await axios.post(`${process.env.MM_API_URL}/load_genomic`, formData, {
      headers: {...formData.getHeaders(), 'Authorization': `Bearer ${this.MM_API_TOKEN}`},
    });
    return response.data;
  }

  @Get('prioritizer_trial_matches')
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth("ApiKeyGuard")
  @ApiOperation({ summary: "Get all trial matches for prioritizer" })
  @ApiOkResponse({ description: "List of trial matches found." })
  async findAll(@CurrentUser() user: user) {

    return this.matchMinerService.getTrialMatchResults(user);
  }
}
