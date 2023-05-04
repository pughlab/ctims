import {PartialType} from "@nestjs/swagger";
import { CreateCtmlSchemaDto } from './create-ctml-schema.dto';

export class UpdateCtmlSchemaDto extends PartialType(CreateCtmlSchemaDto) {}
