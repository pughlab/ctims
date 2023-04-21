import {ApiProperty, ApiPropertyOptional, OmitType, PartialType} from "@nestjs/swagger";
import {CreateCtmlJsonDto} from "./create-ctml-json.dto";

// Exclude trialId because this DTO is used when the trial ID is not yet known (see `trial.service.createTrialWithCtml`)
export class CreateCtmlJsonNoTrialDto extends PartialType(
  OmitType(CreateCtmlJsonDto, ['trialId'])
){}
