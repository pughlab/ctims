export interface IEventMessage {
    user_id: string,
    trial_internal_ids: string[],
    run_status: string,
    run_message: string
}