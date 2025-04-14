import { useState, useEffect } from "react";
import styles from "../styles/Advices.module.css";

const Advices = () => {
  const [advices, setAdvices] = useState({
    author: "",
    authorProfile: "",
    message: "",
  });

  useEffect(() => {
    fetch("https://korean-advice-open-api.vercel.app/api/advice")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdvices(data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <div className={styles.profile}>{advices.authorProfile}</div>
        <div className={styles.author}>{advices.author}</div>
      </div>
      <div className={styles.message}>"{advices.message}"</div>
    </section>
  );
};
export default Advices;
