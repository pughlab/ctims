import {configureStore} from "@reduxjs/toolkit";
import counterReducer, {CounterState} from "./slices/counterSlice";
import modalActionsReducer, {TreeActionsState} from "./slices/modalActionsSlice";
import matchViewModelActionsReducer, {IMatchViewModelState} from "./slices/matchViewModelSlice";
import ctmlModelReducer, {ICtmlModelSliceState} from "./slices/ctmlModelSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import ctmlSchemaReducer, {CtmlSchemaState} from "./slices/ctmlSchemaSlice";

export interface RootState {
  counter: CounterState,
  modalActions: TreeActionsState,
  matchViewModelActions: IMatchViewModelState,
  finalModelAndErrors: ICtmlModelSliceState,
  ctmlSchema: CtmlSchemaState
}

export const store = configureStore<RootState>({
  reducer: {
    counter: counterReducer,
    modalActions: modalActionsReducer,
    matchViewModelActions: matchViewModelActionsReducer,
    finalModelAndErrors: ctmlModelReducer,
    ctmlSchema: ctmlSchemaReducer,
  }
})

setupListeners(store.dispatch)
