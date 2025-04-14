import { useReducer } from "react";
import styles from "../styles/TodoList.module.css";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import classNames from "classnames";
import { TODO_LIST_KEY } from "../constants/storageKey";

function todoReducer(todos, action) {
  let newTodos;

  switch (action.type) {
    case "add_todo": {
      const newTodo = {
        id: Date.now(),
        content: action.content,
        isDone: false,
      };
      newTodos = [...todos, newTodo];

      break;
    }
    case "update_todo": {
      newTodos = todos.map((todo) =>
        todo.id === action.id ? { ...todo, content: action.content, isDone: action.isDone } : todo
      );
      break;
    }
    case "delete_todo": {
      newTodos = todos.filter((todo) => todo.id !== action.id);
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }

  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodos));
  return newTodos;
}

const loadInitialTodos = () => {
  const savedTodos = localStorage.getItem(TODO_LIST_KEY);
  if (savedTodos) {
    return JSON.parse(savedTodos);
  }
  return [];
};

const TodoList = ({ className }) => {
  const [todos, dispatch] = useReducer(todoReducer, null, loadInitialTodos);

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
