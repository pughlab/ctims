import { ApiProperty } from "@nestjs/swagger";

export class UpdateTrialSchemasDto {
  @ApiProperty({ type: [Number] })
  schemaIdList: number[];
}
