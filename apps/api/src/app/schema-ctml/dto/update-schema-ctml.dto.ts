import { PartialType } from '@nestjs/mapped-types';
import { CreateSchemaCtmlDto } from './create-schema-ctml.dto';

export class UpdateSchemaCtmlDto extends PartialType(CreateSchemaCtmlDto) {}
