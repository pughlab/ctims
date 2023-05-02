import {createSlice} from "@reduxjs/toolkit";

export interface CtmlSchemaState {
  schema_version: number;
}

const initialState: CtmlSchemaState = {
  schema_version: 1,
}

export const ctmlSchemaSlice = createSlice({
  name: 'ctmlSchema',
  initialState,
  reducers: {
    setCtmlSchema: (state, action) => {
      state.schema_version = action.payload
    }
  }
});

export const { setCtmlSchema } = ctmlSchemaSlice.actions;
export default ctmlSchemaSlice.reducer;
