import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorSchema, ValidationData} from "@rjsf/utils";

export interface ICtmlModelSliceState {
  ctmlModel: any;
  errorSchema: ValidationData<any>;
}

const initialState: ICtmlModelSliceState = {
  ctmlModel: null,
  errorSchema: {
    errors: [],
    errorSchema: {}
  }
}

export const ctmlModelSlice = createSlice({
  name: 'ctmlModel',
  initialState,
  reducers: {
    setCtmlModel: (state, action) => {
      state.ctmlModel = action.payload;
    },
    setErrorSchema: (state, action: PayloadAction<ValidationData<any>>) => {
      state.errorSchema = action.payload;
    }
  },
});

export const {setCtmlModel, setErrorSchema} = ctmlModelSlice.actions;
export default ctmlModelSlice.reducer;
