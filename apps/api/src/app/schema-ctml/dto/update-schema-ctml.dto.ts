import {PartialType} from "@nestjs/swagger";
import { CreateSchemaCtmlDto } from './create-schema-ctml.dto';

export class UpdateSchemaCtmlDto extends PartialType(CreateSchemaCtmlDto) {}
