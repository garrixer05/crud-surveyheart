import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todoSlice";
import modalReducer from "../feature/modalSlice";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    modal: modalReducer,
  },
});
