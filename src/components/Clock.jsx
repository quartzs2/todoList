import { useEffect, useState } from "react";
import styles from "../styles/Clock.module.css";
import classNames from "classnames";

const getTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const timeString = `${String(hour12).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;

  return timeString;
};

const Clock = ({ className }) => {
  const [time, setTime] = useState(() => getTime());

  useEffect(() => {
    const clockId = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(clockId);
  }, []);

  return (
    <section className={classNames(styles.container, className)}>
      <div className={styles.desc}>현재시간</div>
      <div className={styles.clock}>{time}</div>
    </section>
  );
};
export default Clock;
