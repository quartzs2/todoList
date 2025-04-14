import { useState } from "react";
import styles from "../styles/TodoItem.module.css";
import classNames from "classnames";

const TodoItem = ({ id, content, isDone, dispatch }) => {
  const [isModify, setIsModify] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  const handleDelete = () => {
    dispatch({
      type: "delete_todo",
      id,
    });
  };

  const handleUpdate = () => {
    if (isModify) {
      dispatch({
        type: "update_todo",
        id,
        content: currentContent,
        isDone,
      });
      setIsModify(false);
    } else {
      setIsModify(true);
      setCurrentContent(content);
    }
  };

  const handleContentChange = (e) => setCurrentContent(e.target.value);

  const handleIsDone = () =>
    dispatch({ type: "update_todo", id, content: currentContent, isDone: !isDone });

  return (
    <div className={classNames(styles.todoItem, isDone && styles.done)}>
      <input type="checkbox" checked={isDone} onChange={handleIsDone} />
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
