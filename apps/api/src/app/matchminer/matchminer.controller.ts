import {Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
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
      maxBodyLength: 25 * 1024 * 1024,
      maxContentLength: 25 * 1024 * 1024,
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

  @Post('trial_match_jobs')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Create trial match jobs" })
  @ApiOkResponse({ description: "List trial match jobs" })
  async createMatchJobs(@CurrentUser() user: user, @Body() trialInternalIds: string[]) {
    return this.matchMinerService.createTrialMatchJobs(user, trialInternalIds);
  }

  @Post('add_id_to_trials')
  @UseGuards(KeycloakPasswordGuard)
  @ApiOperation({ summary: "Add trial internal id to matchminer trial collection" })
  async addIdToTrials(@Body() updateMapping: any) {
    const response = await axios.post(`${process.env.MM_API_URL}/add_id_to_trials`,
      updateMapping,
      {headers: {'Authorization': `Bearer ${this.MM_API_TOKEN}`}});
    return response.data;
  }

  @Post('add_id_match_results')
  @UseGuards(KeycloakPasswordGuard)
  @ApiOperation({ summary: "Add trial internal id to matchminer trial_match collection" })
  async addIdMatchResults(@Body() updateMapping: any) {
    const response = await axios.post(`${process.env.MM_API_URL}/add_id_to_match_results`,
      updateMapping,
      {headers: {'Authorization': `Bearer ${this.MM_API_TOKEN}`}});
    return response.data;
  }
}
