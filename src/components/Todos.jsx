import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../feature/todoSlice";
import { setTodo, toggleModal } from "../feature/modalSlice";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Loader from "./Loader";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  const [inputTodo, setInputTodo] = useState("");
  const { todos } = useSelector((store) => store.todo);
  const { isLoading } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (inputTodo.length === 0) {
      return;
    }
    dispatch(
      addTodo({
        todo: inputTodo,
        completed: false,
        userId: 1,
      })
    );
  };
  if (isLoading) {
    console.log(isLoading);
    return <Loader />;
  }
  return (
    <Paper
      elevation={20}
      sx={{
        paddingBottom: "100px",
        marginTop: "50px",
        marginX: "100px",
        background: "#FDF4F5",
      }}
      id="todo"
    >
      <Box
        sx={{
          padding: "20px",
          marginX: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={3}
      >
        <h1 className="heading">TODO LIST</h1>
        <div className="add-todo">
          <TextField
            onChange={(e) => setInputTodo(e.target.value)}
            value={inputTodo}
            id="standard-basic"
            label="Write a todo"
            placeholder="eg: get medicines"
            variant="standard"
            fullWidth
            color="secondary"
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={handleAddTodo}
            size="small"
            sx={{ marginY: "10px", marginX: "30%" }}
            endIcon={<AddIcon />}
          >
            Add Todo
          </Button>
        </div>
      </Box>
      <Box
        sx={{
          marginX: "200px",
          paddingX: "100px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        <List sx={{ marginY: "20px" }}>
          {todos.length > 0 ? (
            todos.map((todo) => {
              return (
                <Paper key={uuidv4()} elevation={14} sx={{ marginY: "5px" }}>
                  <ListItem className="lis" key={todo.id}>
                    {todo.completed ? (
                      <div className="status_c">
                        <h6 color="success">Completed</h6>
                      </div>
                    ) : (
                      <div className="status_p">
                        <h6 sx={{ color: "yellow" }}>Pending</h6>
                      </div>
                    )}
                    <ListItemText
                      key={uuidv4()}
                      className={`${todo.completed && "list_item"}`}
                      // sx={todo.completed && { textDecoration: "line-through" }}
                    >
                      {todo.todo}
                    </ListItemText>
                    <IconButton
                      key={uuidv4()}
                      onClick={() => {
                        dispatch(toggleModal());
                        dispatch(setTodo(todo));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      key={uuidv4()}
                      color="error"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </Paper>
              );
            })
          ) : (
            <h2 className="no_task">No task todo.</h2>
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default Todos;
