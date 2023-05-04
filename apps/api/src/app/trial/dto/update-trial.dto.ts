
import { CreateTrialDto } from './create-trial.dto';
import {PartialType} from "@nestjs/swagger";

// Omit the JSON string input, as updating should be specific to just the trial.
// To update the JSON see the ctml_json controller
export class UpdateTrialDto extends PartialType(CreateTrialDto) {}
