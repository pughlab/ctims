export type status = (typeof status)[keyof typeof status]

// services the results page, with counts of latest matches
export type trialWithResults = {
  trialId: number
  nct_id: string
  nickname: string | null
  principal_investigator: string | null
  status: status | null
  createdAt: Date
  updatedAt: Date
  trialRetCount?: number | null
  matchedDate?: Date | null
}

// the matchminer api returns the following format
export type trialWithResultsMiner = {
  protocol_no: string
  _updated: Date
  count: number
}
