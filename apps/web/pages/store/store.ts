import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import modalActionsReducer from "./slices/modalActionsSlice";
import matchViewModelActionsReducer from "./slices/matchViewModelSlice";
import ctmlModelReducer from "./slices/ctmlModelSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modalActions: modalActionsReducer,
    matchViewModelActions: matchViewModelActionsReducer,
    ctmlModel: ctmlModelReducer,
  }
})

setupListeners(store.dispatch)
