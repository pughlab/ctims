import { PartialType } from '@nestjs/mapped-types';
import { CreateCtmlJsonDto } from './create-ctml-json.dto';

export class UpdateCtmlJsonDto extends PartialType(CreateCtmlJsonDto) {}
