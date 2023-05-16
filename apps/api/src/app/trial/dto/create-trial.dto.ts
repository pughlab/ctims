import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { status, trial_status } from "@prisma/client";

export class CreateTrialDto {
  @ApiProperty()
  nct_id: string;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 191
  })
  nickname?: string;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 191
  })
  principal_investigator?: string;

  @ApiPropertyOptional({
    enum: status
  })
  status: status;

  @ApiProperty({
    description: "The ID of the schema for this trial data."
  })
  ctml_schema_version: number;

  @ApiProperty({
    enum: trial_status
  })
  trial_status: trial_status;

}
