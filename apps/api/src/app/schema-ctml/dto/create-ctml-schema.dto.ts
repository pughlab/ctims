import {ApiProperty} from "@nestjs/swagger";

export class CreateCtmlSchemaDto {
  @ApiProperty({
    description: "Schema version.",
  })
  version: string;

  @ApiProperty()
  schema: string;
}
