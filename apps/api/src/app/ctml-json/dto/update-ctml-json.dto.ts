import {PartialType} from "@nestjs/swagger";
import { CreateCtmlJsonDto } from './create-ctml-json.dto';

export class UpdateCtmlJsonDto extends PartialType(CreateCtmlJsonDto) {}
