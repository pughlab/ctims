import {ApiProperty} from "@nestjs/swagger";

export class CreateSchemaCtmlDto {
  @ApiProperty({
    description: "Schema version.",
  })
  version: string;

  @ApiProperty()
  schema: string;
}
