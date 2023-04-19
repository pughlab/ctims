import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {status} from "@prisma/client";

export class CreateTrialDto {
  @ApiProperty()
  nctId: string;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 191
  })
  nickname?: string;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 191
  })
  principalInvestigator?: string;

  @ApiPropertyOptional({
    enum: status
  })
  status: status;

  @ApiProperty({
    description: "The ID of the schema for this trial data."
  })
  ctml_schema_id: number;

  @ApiProperty({
    description: "JSON string for this trial."
  })
  ctml_json_string: string;

}
