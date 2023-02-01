import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
})

setupListeners(store.dispatch)
