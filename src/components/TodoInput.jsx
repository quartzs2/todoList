import { useState } from "react";
import styles from "../styles/TodoInput.module.css";

const TodoInput = ({ dispatch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue.length === 0) {
      alert("값을 입력해주세요");
      setInputValue("");
      return;
    }

    dispatch({
      type: "add_todo",
      content: trimmedValue,
    });

    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="할 일을 입력하세요"
        className={styles.input}
      />
      <button type="submit" className={styles.addBtn}>
        추가
      </button>
    </form>
  );
};
export default TodoInput;
