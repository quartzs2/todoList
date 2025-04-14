import { useState } from "react";
import styles from "../styles/TodoList.module.css";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import classNames from "classnames";

const TodoList = ({ className }) => {
  const [todos, setTodos] = useState([]);

  return (
    <section className={classNames(className)}>
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
