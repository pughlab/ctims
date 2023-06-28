export type status = (typeof status)[keyof typeof status]

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
