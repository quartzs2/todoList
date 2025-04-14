import { useReducer, useState } from "react";
import styles from "../styles/TodoList.module.css";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import classNames from "classnames";
import { TODO_LIST_KEY } from "../constants/storageKey";
import TodoFilter from "./TodoFilter";

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
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  let todosWillDisplay;

  switch (category) {
    case "checked":
      todosWillDisplay = todos.filter((todo) => todo.isDone);
      break;
    case "unchecked":
      todosWillDisplay = todos.filter((todo) => !todo.isDone);
      break;
    default:
      todosWillDisplay = todos;
      break;
  }

  todosWillDisplay = todosWillDisplay.filter((todo) =>
    todo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={classNames(className)}>
      <TodoInput dispatch={dispatch} />
      <TodoFilter setCategory={setCategory} setSearchTerm={setSearchTerm} />
      <div className={styles.todoList}>
        {todosWillDisplay.map((todo) => (
          <TodoItem key={todo.id} dispatch={dispatch} {...todo} />
        ))}
      </div>
    </section>
  );
};
export default TodoList;
