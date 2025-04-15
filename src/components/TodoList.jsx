import { useReducer, useState, useEffect, useRef } from "react";
import styles from "../styles/TodoList.module.css";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import classNames from "classnames";
import { TODO_LIST_KEY } from "../constants/storageKey";
import TodoFilter from "./TodoFilter";
import TodoUpdateModal from "./TodoUpdateModal";

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
    case "changeOrder": {
      newTodos = [...todos];
      const dragItemValue = newTodos[action.dragItem];
      newTodos.splice(action.dragItem, 1);
      newTodos.splice(action.dragOverItem, 0, dragItemValue);
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }

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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();
  let todosWillDisplay;

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    dispatch({
      type: "changeOrder",
      dragItem: dragItem.current,
      dragOverItem: dragOverItem.current,
    });

    dragItem.current = null;
    dragOverItem.current = null;
  };

  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
  }, [todos]);

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
        {todosWillDisplay.map((todo) => {
          const originalIndex = todos.findIndex((item) => item.id === todo.id);

          if (originalIndex === -1) {
            console.error("원본 인덱스를 찾을 수 없습니다.");
            return null;
          }

          return (
            <TodoItem
              key={todo.id}
              dispatch={dispatch}
              setCurrentTodo={setCurrentTodo}
              setModalOpen={setModalOpen}
              currentTodo={currentTodo}
              onDragStart={(e) => dragStart(e, originalIndex)}
              onDragEnter={(e) => dragEnter(e, originalIndex)}
              onDragEnd={drop}
              {...todo}
            />
          );
        })}
      </div>
      <TodoUpdateModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentTodo={currentTodo}
        dispatch={dispatch}
      />
    </section>
  );
};
export default TodoList;
