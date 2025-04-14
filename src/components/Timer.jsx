import { useEffect, useRef, useState } from "react";
import styles from "../styles/Timer.module.css";
import classNames from "classnames";

const Timer = ({ className }) => {
  const [isStopped, setIsStopped] = useState(true);
  const [minute, setMinute] = useState(5);
  const [second, setSecond] = useState(0);
  const time = useRef(300);
  const timerId = useRef(null);

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (timerId.current) return;

    time.current = minute * 60 + second;
    setIsStopped(false);

    timerId.current = setInterval(() => {
      time.current -= 1;

      if (time.current < 0) {
        alert("시간 종료");
        clearInterval(timerId.current);
        timerId.current = null;
        setIsStopped(true);
        setMinute(5);
        setSecond(0);
        time.current = 300;
      } else {
        setMinute(parseInt(time.current / 60));
        setSecond(time.current % 60);
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null;
    setIsStopped(true);
  };

  const clearTime = () => {
    clearInterval(timerId.current);
    setMinute(5);
    setSecond(0);
    setIsStopped(true);
    time.current = 300;
    timerId.current = null;
  };

  return (
    <section className={classNames(styles.container, className)}>
      <div className={styles.desc}>타이머 - {isStopped ? "정지됨" : "켜짐"}</div>
      <div className={styles.clock}>
        {minute}분 {second}초
      </div>
      <div className={styles.buttons}>
        <button onClick={startTimer} disabled={!isStopped}>
          시작
        </button>
        <button onClick={stopTimer} disabled={isStopped}>
          정지
        </button>
        <button onClick={clearTime}>초기화</button>
      </div>
    </section>
  );
};
export default Timer;
