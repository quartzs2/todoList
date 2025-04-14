import styles from "../styles/TodoList.module.css";
import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  return (
    <section>
      <TodoInput setTodos={setTodos} />
      <div className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} setTodos={setTodos} {...todo} />
        ))}
      </div>
    </section>
  );
};
export default TodoList;
