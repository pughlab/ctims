import { PartialType } from '@nestjs/mapped-types';
import { CreateTrialDto } from './create-trial.dto';

export class UpdateTrialDto extends PartialType(CreateTrialDto) {}
