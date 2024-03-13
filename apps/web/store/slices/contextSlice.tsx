import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ContextSliceState {
  schema_version: number;
  trialId: number;
  nctId: string;
  seletedTrialGroupId: string;
  isTrialGroupAdmin: boolean;
  isFormDisabled: boolean;
  isFormChanged: boolean;
}

const initialState: ContextSliceState = {
  schema_version: 1,
  trialId: 0,
  nctId: '',
  seletedTrialGroupId: '',
  isTrialGroupAdmin: false,
  isFormDisabled: false,
  isFormChanged: false,
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
    },
    setNctId: (state, action: PayloadAction<string>) => {
      state.nctId = action.payload
    },
    selectedTrialGroupId: (state, action: PayloadAction<string>) => {
      state.seletedTrialGroupId = action.payload
    },
    setIsTrialGroupAdmin: (state, action: PayloadAction<boolean>) => {
      state.isTrialGroupAdmin = action.payload
    },
    setIsFormDisabled: (state, action: PayloadAction<boolean>) => {
      state.isFormDisabled = action.payload
    },
    setIsFormChanged: (state, action: PayloadAction<boolean>) => {
      state.isFormChanged = action.payload
    }
  }
});

export const {
  setSchemaVersion,
  setTrialId,
  setNctId,
  selectedTrialGroupId,
  setIsTrialGroupAdmin,
  setIsFormDisabled,
  setIsFormChanged} = contextSlice.actions;
export default contextSlice.reducer;
