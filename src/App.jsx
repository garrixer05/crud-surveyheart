import { useDispatch, useSelector } from "react-redux";
import Todos from "./components/Todos";
import { useEffect } from "react";
import { getTodos } from "./feature/todoSlice";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

function App() {
  const { isLoading } = useSelector((store) => store.todo);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="App">
      {isOpen && <Modal />}
      <Todos />
    </div>
  );
}

export default App;
