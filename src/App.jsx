import styles from "./styles/App.module.css";
import Advices from "./components/Advices";
import Clock from "./components/Clock";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import TodoList from "./components/TodoList";

function App() {
  return (
    <main className={styles.main}>
      <Advices className={styles.advices} />
      <Clock className={styles.clock} />
      <Timer className={styles.timer} />
      <Stopwatch className={styles.stopwatch} />
      <TodoList className={styles.todolist} />
    </main>
  );
}

export default App;
