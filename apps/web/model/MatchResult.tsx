import {CtmlStatusEnum} from "../../../libs/types/src/ctml-status.enum";

interface MatchResult {
  trialId: string;
  nickName: string;
  pi: string;
  status: CtmlStatusEnum;
  createdOn: string;
  modifiedOn: string;
  matchDate: string
}
export default MatchResult;
