import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import modalActionsReducer from "./slices/modalActionsSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modalActions: modalActionsReducer,
  }
})

setupListeners(store.dispatch)
