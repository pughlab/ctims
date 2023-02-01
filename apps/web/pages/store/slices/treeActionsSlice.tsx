import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAddCriteria {
  nodeKey: string;
  type: string;
}

export interface IDeleteCriteria {
  nodeKey: string;
}

export interface TreeActionsState {
  addCriteria: IAddCriteria;
  deleteCriteria: IDeleteCriteria;
}

const initialState: TreeActionsState = {
  addCriteria: {
    nodeKey: '',
    type: ''
  },
  deleteCriteria: {
    nodeKey: '',
  }
};

export const treeActionsSlice = createSlice({
  name: 'treeActions',
  initialState,
  reducers: {
    addAdjacentNode: (state, action: PayloadAction<IAddCriteria>) => {
      state.addCriteria = action.payload;
    },
    deleteNode: (state, action: PayloadAction<IDeleteCriteria>) => {
      state.deleteCriteria = action.payload;
    }
  }
});

export const { addAdjacentNode, deleteNode } = treeActionsSlice.actions;
export default treeActionsSlice.reducer;
