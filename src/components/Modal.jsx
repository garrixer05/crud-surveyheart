import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../feature/modalSlice";
import { editTodo } from "../feature/todoSlice";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Modal = () => {
  const { todo } = useSelector((store) => store.modal);
  let val = todo ? todo.todo : "";
  const [Todo, setTodo] = useState(val);
  const dispatch = useDispatch();
  const [checked, setchecked] = useState(todo.completed);

  const handleEdit = (e) => {
    e.preventDefault();
    let newTodo = {
      ...todo,
      todo: Todo,
      completed: checked,
    };
    dispatch(editTodo(newTodo));
    dispatch(toggleModal());
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <Paper sx={{ paddingX: "50px", paddingY: "30px" }}>
          <form action="">
            <h3>Edit todo</h3>
            <TextField
              fullWidth
              multiline
              size="small"
              color="secondary"
              variant="standard"
              label="Todo"
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              value={Todo}
              sx={{ marginBottom: "20px" }}
            />
            <Box mx={5} mb={3} justifyItems={"center"}>
              <Typography sx={{ display: "inline-block" }} component={"p"}>
                Mark as completed ?
              </Typography>
              <Checkbox
                onChange={(e) => setchecked(!checked)}
                checked={checked}
                color="success"
              />
            </Box>
            <div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </Button>
              <Button
                sx={{ marginLeft: "50px" }}
                variant="contained"
                size="small"
                color="error"
                onClick={() => dispatch(toggleModal())}
              >
                Close
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </aside>
  );
};
export default Modal;
