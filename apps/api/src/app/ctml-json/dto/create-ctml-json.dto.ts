import {ApiProperty} from "@nestjs/swagger";

export class CreateCtmlJsonDto {
  @ApiProperty()
  version: number;

  @ApiProperty()
  trialId: number;

  @ApiProperty()
  data: string;
}
