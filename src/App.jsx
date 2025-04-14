import Advices from "./components/Advices";
import Clock from "./components/Clock";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <Clock />
      <Timer />
      <Stopwatch />
      <Advices />
      <TodoList />
    </>
  );
}

export default App;
