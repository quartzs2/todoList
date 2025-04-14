import { useState, useRef, useEffect } from "react";
import styles from "../styles/Stopwatch.module.css";
import classNames from "classnames";

const Stopwatch = ({ className }) => {
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleStart() {
    if (isRunning) return;

    setIsRunning(true);
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    if (!isRunning) return;

    clearInterval(intervalRef.current);
    setIsRunning(false);

    setAccumulatedTime((prevAccumulatedTime) => prevAccumulatedTime + (Date.now() - startTime));
  }

  const clearTime = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setStartTime(null);
    setAccumulatedTime(0);
    setNow(0);
    intervalRef.current = null;
  };

  let currentDisplayTime = accumulatedTime;
  if (isRunning && startTime !== null) {
    currentDisplayTime += now - startTime;
  }

  let secondsPassed = currentDisplayTime / 1000;

  return (
    <section className={classNames(styles.container, className)}>
      <div className={styles.desc}>스톱워치</div>
      <div className={styles.clock}>{secondsPassed.toFixed(3)}</div>
      <div className={styles.buttons}>
        <button onClick={handleStart} disabled={isRunning}>
          시작
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          정지
        </button>
        <button onClick={clearTime}>초기화</button>
      </div>
    </section>
  );
};
export default Stopwatch;
