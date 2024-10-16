import { useState, useEffect } from "react"
import { useQuizContext } from '../Context'
import { QuizState } from "./Interfaces";



function Timer() {
  const { setQuiz } = useQuizContext();
  const [seconds, setSeconds] = useState(50);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);
  useEffect(() => {
    if (seconds === 0) {
      setQuiz((prevQuiz: QuizState) => ({ ...prevQuiz, finishQuiz: true }));
    }
  }, [seconds]);
  return (
    <>
      <div className='timer'>
      <div className='circle'>
        <h3 className='seconds-text'>{seconds}</h3>
      </div>
    </div>
    </>
  )
}

export default Timer
