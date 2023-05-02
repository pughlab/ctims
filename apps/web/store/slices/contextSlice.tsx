import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ContextSliceState {
  schema_version: number;
  trialId: number;
}

const initialState: ContextSliceState = {
  schema_version: 1,
  trialId: 0,
}

export const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setSchemaVersion: (state, action: PayloadAction<number>) => {
      state.schema_version = action.payload
    },
    setTrialId: (state, action: PayloadAction<number>) => {
      state.trialId = action.payload
    }
  }
});

export const { setSchemaVersion, setTrialId } = contextSlice.actions;
export default contextSlice.reducer;
