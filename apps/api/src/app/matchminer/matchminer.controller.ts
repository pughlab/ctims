import { Controller, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MatchminerService } from './matchminer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios, {AxiosResponse} from 'axios';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as FormData from 'form-data';
import { KeycloakPasswordGuard } from '../auth/KeycloakPasswordGuard';


@Controller('matchminer')
@ApiTags('matchminer')
export class MatchminerController {
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
      headers:formData.getHeaders(),
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
      headers:formData.getHeaders(),
    });
    return response.data;
  }

}
