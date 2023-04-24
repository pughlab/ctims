import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {status} from "@prisma/client";

export class TrialResponseDto {
  @ApiProperty()
  nctId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  principalInvestigator: string;

  @ApiProperty({
    enum: status
  })
  status: status;

  @ApiProperty({
    description: "The ID of the schema for this trial data."
  })
  ctml_schema_id: number;

}
