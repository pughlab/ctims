import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export interface AppContextState {
  isLongOperation: boolean;
}

const initialState: AppContextState = {
  isLongOperation: false,
}

export const AppContextSlice = createSlice({
  name: 'appContext',
  initialState,
  reducers: {
    setIsLongOperation: (state, action: PayloadAction<boolean>) => {
      state.isLongOperation = action.payload;
    }
  }
});

export const { setIsLongOperation } = AppContextSlice.actions;

export default AppContextSlice.reducer;
