import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import treeActionsReducer from "./slices/treeActionsSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treeActions: treeActionsReducer,
  }
})

setupListeners(store.dispatch)
