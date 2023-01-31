import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAddCriteria {
  nodeKey: string;
  type: string;
}

export interface TreeActionsState {
  addCriteria: IAddCriteria;
}

const initialState: TreeActionsState = {
  addCriteria: {
    nodeKey: '',
    type: ''
  }
};

export const treeActionsSlice = createSlice({
  name: 'treeActions',
  initialState,
  reducers: {
    addAdjacentNode: (state, action: PayloadAction<IAddCriteria>) => {
      state.addCriteria = action.payload;
    }
  }
});

export const { addAdjacentNode } = treeActionsSlice.actions;
export default treeActionsSlice.reducer;
