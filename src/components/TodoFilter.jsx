import styles from "../styles/TodoFilter.module.css";

const TodoFilter = ({ setCategory, setSearchTerm }) => {
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.radioContainer}>
        <input
          type="radio"
          name="filterBtn"
          value="all"
          id="all"
          onChange={categoryHandler}
          defaultChecked
        />
        <label htmlFor="all">all</label>
        <input
          type="radio"
          name="filterBtn"
          value="checked"
          id="checked"
          onChange={categoryHandler}
        />
        <label htmlFor="checked">checked</label>
        <input
          type="radio"
          name="filterBtn"
          value="unchecked"
          id="unchecked"
          onChange={categoryHandler}
        />
        <label htmlFor="unchecked">unchecked</label>
      </div>
      <div className={styles.searchContainer}>
        <div>🔎</div>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className={styles.search}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
export default TodoFilter;
