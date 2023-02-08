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

export interface IFormChange {
  counter: number;
}

export interface TreeActionsState {
  addCriteria: IAddCriteria;
  deleteCriteria: IDeleteCriteria;
  operatorChange: IOperatorChange;
  formChangeCounter: number;
  ctmlDialogModel: any;
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
  },
  formChangeCounter: 0,
  ctmlDialogModel: null
};

export const modalActionsSlice = createSlice({
  name: 'modalActions',
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
    },
    formChange: (state) => {
      state.formChangeCounter += 1;
    },
    resetFormChangeCounter: (state) => {
      state.formChangeCounter = 0;
    },
    setCtmlDialogModel: (state, action: PayloadAction<any>) => {
      state.ctmlDialogModel = action.payload;
    }
  }
});

export const { addAdjacentNode, deleteNode, operatorChange, formChange, setCtmlDialogModel, resetFormChangeCounter } = modalActionsSlice.actions;
export default modalActionsSlice.reducer;
