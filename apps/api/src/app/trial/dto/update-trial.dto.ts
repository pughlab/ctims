
import { CreateTrialDto } from './create-trial.dto';
import {PartialType} from "@nestjs/swagger";

export class UpdateTrialDto extends PartialType(CreateTrialDto) {}
