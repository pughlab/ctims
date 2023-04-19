import {ApiProperty} from "@nestjs/swagger";

export class CreateCtmlJsonDto {
  @ApiProperty()
  schemaVersionId: number;

  @ApiProperty()
  data: string;

  @ApiProperty()
  trialId: number
}
