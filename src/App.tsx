import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import TodoList from "./components/todo/TodoList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  );
}

export default App;
