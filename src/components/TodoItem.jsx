import { useState } from "react";
import styles from "../styles/TodoItem.module.css";

const TodoItem = ({ id, content, setTodos }) => {
  const [isModify, setIsModify] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = () => {
    if (isModify) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, content: currentContent } : todo))
      );
      setIsModify(false);
    } else {
      setIsModify(true);
      setCurrentContent(content);
    }
  };

  const handleContentChange = (e) => setCurrentContent(e.target.value);

  return (
    <div className={styles.todoItem}>
      {isModify ? (
        <input
          type="text"
          className={styles.contentInput}
          value={currentContent}
          onChange={handleContentChange}
          autoFocus
        />
      ) : (
        <div className={styles.content}>{currentContent}</div>
      )}
      <button className={styles.button} onClick={handleUpdate}>
        {isModify ? "완료" : "수정"}
      </button>
      <button className={styles.button} onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
};
export default TodoItem;
