import Modal from "./Modal";
import styles from "../styles/TodoUpdateModal.module.css";
import { useState } from "react";

const TodoUpdateModal = ({ modalOpen, setModalOpen, currentTodo, dispatch }) => {
  const [updatedContent, setUpdatedContent] = useState("");
  const handleChange = (e) => setUpdatedContent(e.target.value);
  const handleClose = () => {
    setUpdatedContent("");
    setModalOpen(false);
  };
  const handleUpdate = () => {
    if (currentTodo === null) return;
    if (updatedContent.trim().length === 0) {
      alert("값을 입력해주세요");
      return;
    }

    dispatch({
      type: "update_todo",
      id: currentTodo.id,
      content: updatedContent,
      isDone: currentTodo.isDone,
    });

    setUpdatedContent("");
    setModalOpen(false);
  };

  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <h3 className={styles.title}>Todo 수정</h3>
      {currentTodo ? (
        <textarea
          className={styles.textarea}
          name="updatedContent"
          id="updatedContent"
          rows={10}
          cols={30}
          placeholder="수정할 내용을 입력해주세요"
          value={updatedContent}
          onChange={handleChange}
        />
      ) : (
        <div className={styles.error}>잘못된 접근입니다</div>
      )}
      <div className={styles.buttons}>
        <button onClick={handleClose}>취소</button>
        {currentTodo && <button onClick={handleUpdate}>완료</button>}
      </div>
    </Modal>
  );
};
export default TodoUpdateModal;
