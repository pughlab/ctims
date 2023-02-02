import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAddCriteria {
  nodeKey: string;
  type: string;
}

export interface IDeleteCriteria {
  nodeKey: string;
}

export interface IOperatorChange {
  nodeKey: string;
  operator: string;
}

export interface TreeActionsState {
  addCriteria: IAddCriteria;
  deleteCriteria: IDeleteCriteria;
  operatorChange: IOperatorChange;
}

const initialState: TreeActionsState = {
  addCriteria: {
    nodeKey: '',
    type: ''
  },
  deleteCriteria: {
    nodeKey: '',
  },
  operatorChange: {
    nodeKey: '',
    operator: ''
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
    },
    operatorChange: (state, action: PayloadAction<IOperatorChange>) => {
      state.operatorChange = action.payload;
    }
  }
});

export const { addAdjacentNode, deleteNode, operatorChange } = treeActionsSlice.actions;
export default treeActionsSlice.reducer;
