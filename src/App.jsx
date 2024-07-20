import { useDispatch, useSelector } from "react-redux";
import Todos from "./components/Todos";
import { useEffect } from "react";
import { getTodos, setLoading } from "./feature/todoSlice";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

function App() {
  const { isLoading } = useSelector((store) => store.todo);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(setLoading());
    dispatch(getTodos());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }
  return (
    <div className="App">
      {isOpen && <Modal />}
      <Todos />
    </div>
  );
}

export default App;
