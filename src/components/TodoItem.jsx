import styles from "../styles/TodoItem.module.css";
import classNames from "classnames";

const TodoItem = ({
  id,
  content,
  isDone,
  dispatch,
  setCurrentTodo,
  setModalOpen,
  currentTodo,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const handleDelete = () => {
    dispatch({
      type: "delete_todo",
      id,
    });
    if (currentTodo.id === id) {
      setCurrentTodo(null);
    }
  };

  const handleIsDone = () => dispatch({ type: "update_todo", id, content, isDone: !isDone });

  const handleUpdate = () => {
    setCurrentTodo({ id, content, isDone });
    setModalOpen(true);
  };

  return (
    <div
      className={classNames(styles.todoItem, isDone && styles.done)}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <input type="checkbox" checked={isDone} onChange={handleIsDone} />

      <div className={styles.content}>{content}</div>

      <button className={styles.button} onClick={handleUpdate}>
        수정
      </button>
      <button className={styles.button} onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
};
export default TodoItem;
