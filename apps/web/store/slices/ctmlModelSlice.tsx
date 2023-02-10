import {createSlice} from "@reduxjs/toolkit";

export interface ICtmlModelSliceState {
  ctmlModel: any;
}

const initialState: ICtmlModelSliceState = {
  ctmlModel: null
}

export const ctmlModelSlice = createSlice({
  name: 'ctmlModel',
  initialState,
  reducers: {
    setCtmlModel: (state, action) => {
      state.ctmlModel = action.payload;
    }
  },
});

export const {setCtmlModel} = ctmlModelSlice.actions;
export default ctmlModelSlice.reducer;
