import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  todo: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { toggleModal, setTodo } = modalSlice.actions;
export default modalSlice.reducer;
