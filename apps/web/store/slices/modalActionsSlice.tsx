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
  // where did the action originate from
  location: 'form' | 'tree';
}

export interface IMatchDialogErrors {
  // where key is uuid of the node (node key)
  [key: string]: boolean;
}

export interface TreeActionsState {
  addCriteria: IAddCriteria;
  deleteCriteria: IDeleteCriteria;
  operatorChange: IOperatorChange;
  formChangeCounter: number;
  ctmlDialogModel: any;
  matchDialogErrors: IMatchDialogErrors;
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
    operator: '',
    location: 'form'
  },
  formChangeCounter: 0,
  ctmlDialogModel: null,
  matchDialogErrors: {}
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
    },
    setMatchDialogErrors: (state, action: PayloadAction<IMatchDialogErrors>) => {
      state.matchDialogErrors = {...state.matchDialogErrors, ...action.payload};
    },
    deleteMatchDialogError: (state, action: PayloadAction<string>) => {
      delete state.matchDialogErrors[action.payload];
    },
    resetMatchDialogErrors: (state) => {
      state.matchDialogErrors = {};
    }
  }
});

export const {
  addAdjacentNode,
  deleteNode,
  operatorChange,
  formChange,
  setCtmlDialogModel,
  resetFormChangeCounter,
  setMatchDialogErrors,
  deleteMatchDialogError,
  resetMatchDialogErrors
} = modalActionsSlice.actions;
export default modalActionsSlice.reducer;
