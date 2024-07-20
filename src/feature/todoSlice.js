import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("https://dummyjson.com/todos?limit=3");
      // console.log(response.data.todos);
      return response.data.todos;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const response = await axios.delete(`https://dummyjson.com/todos/1`);
      console.log(response.data);
      return { id };
    } catch (error) {
      console.log(error);
    }
  }
);
export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async (todo, thunkAPI) => {
    console.log(todo);
    thunkAPI.dispatch(setLoading());
    try {
      const response = await axios.put(
        `https://dummyjson.com/todos/${todo.id}`,
        { todo }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todo, thunkAPI) => {
    console.log(todo);
    thunkAPI.dispatch(setLoading());
    try {
      const response = await axios.post(
        `https://dummyjson.com/todos/add`,
        todo
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  todos: [],
  isLoading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      const newState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      newState.push(action.payload.todo);
      state.todos = newState;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      let newTodo = action.payload;
      newTodo.id += 1;
      state.todos.push(newTodo);
    });
  },
});

export default todoSlice.reducer;
export const { setLoading } = todoSlice.actions;
