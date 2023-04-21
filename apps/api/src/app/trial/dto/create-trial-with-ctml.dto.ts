import {ApiProperty} from "@nestjs/swagger";
import {CreateTrialDto} from "./create-trial.dto";
import {CreateCtmlJsonNoTrialDto} from "../../ctml-json/dto/create-ctml-json-no-trial.dto";

export class CreateTrialWithCtmlDto {
  @ApiProperty({type: CreateTrialDto})
  createTrialDto: CreateTrialDto;

  @ApiProperty()
  createCtmlJsonDto: CreateCtmlJsonNoTrialDto;


}
