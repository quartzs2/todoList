import { useReducer } from "react";
import styles from "../styles/TodoList.module.css";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import classNames from "classnames";

function todoReducer(todos, action) {
  switch (action.type) {
    case "add_todo": {
      const newTodo = {
        id: Date.now(),
        content: action.content,
      };
      return [...todos, newTodo];
    }
    case "update_todo": {
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, content: action.content } : todo
      );
    }
    case "delete_todo": {
      return todos.filter((todo) => todo.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const TodoList = ({ className }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <section className={classNames(className)}>
      <TodoInput dispatch={dispatch} />
      <div className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} dispatch={dispatch} {...todo} />
        ))}
      </div>
    </section>
  );
};
export default TodoList;
