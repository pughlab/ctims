import {CtmlStatusEnum} from "../../../libs/types/src/ctml-status.enum";

interface CondenseMatchResult {
  trialId: string;
  nickName: string;
  pi: string;
  status: CtmlStatusEnum;
  createdOn: string;
  modifiedOn: string;
  matchCCount: number;
  matchDate: string
}
export default CondenseMatchResult;
